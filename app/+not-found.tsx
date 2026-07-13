import React from "react";
import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center p-5 bg-surface-warm">
        <Text className="text-[20px] font-bold text-on-surface font-inter">
          Esta pantalla no existe.
        </Text>
        <Link href="/(tabs)" className="mt-4 py-4">
          <Text className="text-[14px] text-primary font-semibold font-inter underline">
            Volver al Inicio
          </Text>
        </Link>
      </View>
    </>
  );
}
