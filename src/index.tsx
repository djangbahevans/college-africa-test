import { NavigationContainer } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { Stack } from "./app/navigation";
import { AlbumListPage } from "./screens/AlbumListScreen";
import { AlbumPage } from "./screens/AlbumScreen";
import { useAppDispatch, useAppSelector } from "./store";
import { setError } from "./store/error";

export const App = () => {
  const error = useAppSelector((state) => state.error);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AlbumList">
          <Stack.Screen
            name="AlbumList"
            component={AlbumListPage}
            options={{ title: "Albums" }}
          />
          <Stack.Screen name="Album" component={AlbumPage} />
        </Stack.Navigator>
      </NavigationContainer>
      <Snackbar
        visible={error !== ""}
        onDismiss={() => dispatch(setError(""))}
        action={{
          label: "Dismiss",
          onPress: () => dispatch(setError("")),
        }}
      >
        {error}
      </Snackbar>
    </SafeAreaView>
  );
};
