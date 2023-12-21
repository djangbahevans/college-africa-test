import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import {
  FlatList,
  GestureResponderEvent,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator, Divider, List } from "react-native-paper";
import Animated, {
  Layout,
  LightSpeedInLeft,
  LightSpeedOutRight,
} from "react-native-reanimated";

import { RootStackParamList } from "../app/navigation";
import { Album, AlbumSchema } from "../app/types";
import { axios } from "../libs/axios";
import { useAppDispatch, useAppSelector } from "../store";
import { removeAlbum, setAlbums } from "../store/albums";
import { setError } from "../store/error";

type Props = NativeStackScreenProps<RootStackParamList, "AlbumList">;

export const AlbumListPage: FC<Props> = ({ navigation, route }) => {
  const albums = useAppSelector((state) => state.albums);
  const dispatch = useAppDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDelete = (id: number) => async () => {
    try {
      await axios.delete(`/albums/${id}`);
      dispatch(removeAlbum(id));
    } catch (_) {
      dispatch(setError?.("Failed to delete album. Please try again."));
    }
  };

  const fetchAlbums = async () => {
    try {
      const response = await axios.get("/albums");
      const albums = response.data.map((album: unknown) =>
        AlbumSchema.parse(album),
      );
      dispatch(setAlbums(albums));
    } catch (_) {
      dispatch(setError?.("Failed to load albums. Please try again."));
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <FlatList
      data={albums}
      onRefresh={async () => {
        setIsRefreshing(true);
        await fetchAlbums();
        setIsRefreshing(false);
      }}
      refreshing={isRefreshing}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          onDelete={handleDelete(item.id)}
          navigation={navigation}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const ListItem: FC<{
  item: Album;
  onDelete(): void;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "AlbumList",
    undefined
  >;
}> = ({ item, onDelete, navigation }) => {
  const [deleting, setDeleting] = useState(false);

  const onPress = (event: GestureResponderEvent) => {
    event.preventDefault();
    navigation.navigate("Album", { album: item });
  };

  return (
    <TouchableOpacity onPress={onPress} key={item.id}>
      <Animated.View
        layout={Layout.springify()}
        entering={LightSpeedInLeft}
        exiting={LightSpeedOutRight}
      >
        <List.Item
          title={item.title}
          onPress={onPress}
          right={(props) =>
            deleting ? (
              <ActivityIndicator {...props} animating />
            ) : (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  setDeleting(true);
                  onDelete();
                }}
              >
                <List.Icon {...props} icon="delete" />
              </TouchableOpacity>
            )
          }
        />
      </Animated.View>
    </TouchableOpacity>
  );
};
