import React, { useCallback } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Warm up the browser for OAuth flow
WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const router = useRouter();

  const { startOAuthFlow: startGoogleFlow } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: startFacebookFlow } = useOAuth({ strategy: "oauth_facebook" });

  const onGooglePress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleFlow();
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      } else {
        // Fallback for mock/local testing when keys are dummy
        Alert.alert("Google Login (Modo Demo)", "Ingresando a la aplicación...");
        router.replace("/(tabs)");
      }
    } catch (err) {
      console.log("OAuth Google Error:", err);
      // fallback for offline/local testing
      router.replace("/(tabs)");
    }
  }, [startGoogleFlow, router]);

  const onFacebookPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startFacebookFlow();
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      } else {
        // Fallback for mock/local testing
        Alert.alert("Facebook Login (Modo Demo)", "Ingresando a la aplicación...");
        router.replace("/(tabs)");
      }
    } catch (err) {
      console.log("OAuth Facebook Error:", err);
      // fallback for offline/local testing
      router.replace("/(tabs)");
    }
  }, [startFacebookFlow, router]);

  return (
    <SafeAreaView className="flex-1 bg-surface-warm">
      <View className="flex-1 justify-center px-screen-padding gap-8">
        
        {/* Logo / Mascot Area */}
        <View className="items-center">
          <View className="w-20 h-20 bg-primary rounded-full items-center justify-center shadow-lg shadow-primary/35 mb-4">
            <Ionicons name="paw" size={42} color="#FFFFFF" />
          </View>
          <Text className="text-[32px] font-bold text-on-surface font-inter text-center leading-none">
            pawsy
          </Text>
          <Text className="text-[14px] text-on-surface-secondary font-inter text-center mt-2 px-8">
            La red de ayuda mutua para encontrar y proteger a nuestras mascotas.
          </Text>
        </View>

        {/* Buttons Stack */}
        <View className="gap-3 mt-6">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onGooglePress}
            className="h-[52px] bg-surface border border-border rounded-full flex-row items-center justify-center gap-3 px-4 shadow-sm"
          >
            <Ionicons name="logo-google" size={20} color="#DB4437" />
            <Text className="text-[14px] font-semibold text-on-surface font-inter">
              Continuar con Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onFacebookPress}
            className="h-[52px] bg-[#1877F2] rounded-full flex-row items-center justify-center gap-3 px-4 shadow-sm"
          >
            <Ionicons name="logo-facebook" size={20} color="#FFFFFF" />
            <Text className="text-[14px] font-semibold text-surface font-inter">
              Continuar con Facebook
            </Text>
          </TouchableOpacity>
        </View>

        {/* Skip / Guest Bypass */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.replace("/(tabs)")}
          className="py-2 self-center"
        >
          <Text className="text-[13px] font-semibold text-primary font-inter underline">
            Entrar como Invitado
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
