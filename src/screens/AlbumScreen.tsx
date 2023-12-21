import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView } from "react-native";

import { RootStackParamList } from "../app/navigation";
import { Photo, PhotoSchema } from "../app/types";
import { axios } from "../libs/axios";
import { useAppDispatch } from "../store";
import { setError } from "../store/error";

type Props = NativeStackScreenProps<RootStackParamList, "Album">;

const numColumns = 3;

export const AlbumPage: FC<Props> = ({ route, navigation }) => {
  const { album } = route.params;
  const [images, setImages] = useState<Photo[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useAppDispatch();

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(`/albums/${album.id}/photos`);
      const photos = response.data.map((photo: unknown) =>
        PhotoSchema.parse(photo),
      );
      setImages(photos);
    } catch (_) {
      dispatch(setError("Failed to load photos. Please try again."));
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <FlatList
      data={images}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item.thumbnailUrl }}
          style={{
            aspectRatio: 1,
            flex: 1 / numColumns,
          }}
        />
      )}
      onRefresh={async () => {
        setIsRefreshing(true);
        await fetchPhotos();
        setIsRefreshing(false);
      }}
      refreshing={isRefreshing}
      numColumns={numColumns}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
