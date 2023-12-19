import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
import Animated, {
  Layout,
  LightSpeedInLeft,
  LightSpeedOutRight,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootStackParamList } from "../app/navigation";
import { AlbumSchema } from "../app/types";
import { axios } from "../libs/axios";
import { useAppDispatch, useAppSelector } from "../store";
import { removeAlbum, setAlbums } from "../store/albums";
import { setError } from "../store/error";

type Props = NativeStackScreenProps<RootStackParamList, "AlbumList">;

export const AlbumListPage: FC<Props> = ({ navigation, route }) => {
  const albums = useAppSelector((state) => state.albums);
  const dispatch = useAppDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    axios
      .get("/albums")
      .then((response: { data: unknown[] }) => {
        const albums = response.data.map((album: unknown) =>
          AlbumSchema.parse(album),
        );
        dispatch(setAlbums(albums));
      })
      .catch(() => {
        dispatch(setError("Failed to load albums. Please try again."));
      });
  }, []);

  return (
    <FlatList
      data={albums}
      onRefresh={async () => {
        setIsRefreshing(true);
        try {
          const response = await axios.get("/albums");
          const albums = response.data.map((album: unknown) =>
            AlbumSchema.parse(album),
          );
          dispatch(setAlbums(albums));
        } catch (_) {
          dispatch(setError("Failed to load albums. Please try again."));
        }
        setIsRefreshing(false);
      }}
      refreshing={isRefreshing}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Album", { album: item });
          }}
        >
          <Animated.View
            layout={Layout.springify()}
            entering={LightSpeedInLeft}
            exiting={LightSpeedOutRight}
          >
            <List.Item
              key={item.id}
              title={item.title}
              onPress={() => navigation.navigate("Album", { album: item })}
              right={(props) => (
                <TouchableOpacity
                  {...props}
                  onPress={async () => {
                    try {
                      await axios.delete(`/albums/${item.id}`);
                      dispatch(removeAlbum(item.id));
                    } catch (_) {
                      setError?.("Failed to delete album. Please try again.");
                    }
                  }}
                >
                  <List.Icon {...props} icon="delete" />
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
