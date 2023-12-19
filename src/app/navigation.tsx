import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Album } from "./types";

export type RootStackParamList = {
  AlbumList: undefined;
  Album: { album: Album };
};

export const Stack = createNativeStackNavigator<RootStackParamList>();
