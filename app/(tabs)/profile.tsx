import React from "react";
import { View, Text, ScrollView, Image, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { Card } from "../../features/common/components/card.component";
import { Badge } from "../../features/common/components/badge.component";
import { COLORS } from "../../features/common/lib/constants.lib";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      if (signOut) {
        await signOut();
        router.replace("/(auth)/sign-in");
      } else {
        Alert.alert("Sesión Cerrada", "Has cerrado sesión de tu cuenta.");
      }
    } catch (e) {
      console.error("Sign out error:", e);
      Alert.alert("Error", "Ocurrió un error al cerrar sesión.");
    }
  };

  const displayName = user?.fullName || "Martín Rodríguez";
  const displayEmail = user?.primaryEmailAddress?.emailAddress || "martin.rod@gmail.com";
  const displayAvatar = user?.imageUrl
    ? { uri: user.imageUrl }
    : require("../../assets/images/react-logo.png"); // fallback local image

  return (
    <SafeAreaView className="flex-1 bg-surface-warm">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-screen-padding">
        
        {/* User Card & Profile Hero */}
        <View className="items-center mt-6 mb-6">
          <View className="relative">
            <Image
              source={displayAvatar}
              className="w-24 h-24 rounded-full border-4 border-surface bg-surface-muted shadow-sm"
              resizeMode="cover"
            />
            {/* Premium tag floating bottom-center */}
            <View className="absolute -bottom-2 bg-secondary px-3 py-1 rounded-full border border-surface shadow-sm self-center">
              <Text className="text-[10px] font-plus-jakarta-bold text-surface uppercase tracking-wider">
                Premium
              </Text>
            </View>
          </View>
          
          <Text className="text-[22px] font-plus-jakarta-extrabold text-on-surface mt-4">
            {displayName}
          </Text>
          <Text className="text-[13px] text-on-surface-secondary font-plus-jakarta">
            {displayEmail}
          </Text>
        </View>

        {/* Numeric Stat Cards Row */}
        <View className="flex-row gap-3 mb-6">
          {[
            { label: "Reportes", count: "3", icon: "megaphone-outline", color: "text-primary" },
            { label: "Adoptados", count: "2", icon: "heart-outline", color: "text-secondary" },
            { label: "Favoritos", count: "5", icon: "star-outline", color: "text-amber-500" }
          ].map((stat, idx) => (
            <Card key={idx} className="flex-1 items-center py-4 border border-border/40 bg-surface rounded-xl">
              <Ionicons name={stat.icon as any} size={20} className={`${stat.color} mb-1`} color={stat.color === 'text-primary' ? COLORS.primary : stat.color === 'text-secondary' ? COLORS.secondary : '#F59E0B'} />
              <Text className="text-[20px] font-plus-jakarta-extrabold text-on-surface">{stat.count}</Text>
              <Text className="text-[11px] font-plus-jakarta-semibold text-on-surface-secondary mt-0.5">{stat.label}</Text>
            </Card>
          ))}
        </View>

        {/* Section: Mis Reportes Activos (Horizontal Scroll) */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[16px] font-plus-jakarta-bold text-on-surface">
              Mis Reportes Activos
            </Text>
            <TouchableOpacity onPress={() => Alert.alert("Reportes", "Abriendo todos tus reportes...")}>
              <Text className="text-[12px] font-plus-jakarta-bold text-primary">Ver todos</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="-mx-screen-padding px-screen-padding"
          >
            {/* Report Card 1 */}
            <Card className="w-72 border border-border/50 bg-surface p-3 mr-3 rounded-xl flex-row gap-3">
              <Image
                source={require("../../assets/images/lost_dog.png")}
                className="w-16 h-16 rounded-lg bg-surface-muted"
                resizeMode="cover"
              />
              <View className="flex-1 justify-between">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[14px] font-plus-jakarta-bold text-on-surface">Cooper</Text>
                  <View className="bg-red-500/10 px-2 py-0.5 rounded-md">
                    <Text className="text-[9px] font-plus-jakarta-bold text-red-500 uppercase">Buscando</Text>
                  </View>
                </View>
                <Text className="text-[11px] font-plus-jakarta text-on-surface-secondary">Mestizo • Hace 2 días</Text>
                <TouchableOpacity 
                  onPress={() => Alert.alert("Cerrar Reporte", "Marcar reporte como resuelto.")}
                  className="bg-secondary px-2.5 py-1 rounded-full self-start mt-1"
                >
                  <Text className="text-[10px] font-plus-jakarta-bold text-surface">Marcar Encontrado</Text>
                </TouchableOpacity>
              </View>
            </Card>

            {/* Report Card 2 */}
            <Card className="w-72 border border-border/50 bg-surface p-3 mr-3 rounded-xl flex-row gap-3">
              <Image
                source={require("../../assets/images/found_cat.png")}
                className="w-16 h-16 rounded-lg bg-surface-muted"
                resizeMode="cover"
              />
              <View className="flex-1 justify-between">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[14px] font-plus-jakarta-bold text-on-surface">Milo</Text>
                  <View className="bg-secondary/15 px-2 py-0.5 rounded-md">
                    <Text className="text-[9px] font-plus-jakarta-bold text-secondary uppercase">Encontrado</Text>
                  </View>
                </View>
                <Text className="text-[11px] font-plus-jakarta text-on-surface-secondary">Tabby • Hace 4 días</Text>
                <View className="bg-surface-muted px-2.5 py-1 rounded-full self-start mt-1 border border-border/50">
                  <Text className="text-[10px] font-plus-jakarta-bold text-on-surface-secondary">Reporte Cerrado</Text>
                </View>
              </View>
            </Card>
          </ScrollView>
        </View>

        {/* Section: Mis Mascotas Registradas */}
        <View className="mb-6">
          <Text className="text-[16px] font-plus-jakarta-bold text-on-surface mb-3">
            Mis Mascotas
          </Text>
          
          <Card className="border border-border/50 bg-surface p-4 rounded-xl flex-row justify-between items-center mb-3">
            <View className="flex-row items-center gap-3">
              <Image
                source={require("../../assets/images/adoptable_puppy.png")}
                className="w-12 h-12 rounded-full"
                resizeMode="cover"
              />
              <View>
                <Text className="text-[15px] font-plus-jakarta-bold text-on-surface">Luna</Text>
                <Text className="text-[12px] font-plus-jakarta text-on-surface-secondary">Cocker Spaniel • 2 años</Text>
              </View>
            </View>
            <TouchableOpacity className="w-8 h-8 bg-surface rounded-full border border-border items-center justify-center">
              <Ionicons name="create-outline" size={16} color={COLORS.onSurfaceSecondary} />
            </TouchableOpacity>
          </Card>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => Alert.alert("Registrar Mascota", "Formulario para registrar tu mascota...")}
            className="border border-dashed border-primary/50 bg-primary/5 py-3.5 rounded-xl items-center justify-center flex-row gap-2"
          >
            <Ionicons name="add" size={18} color={COLORS.primary} />
            <Text className="text-[13px] font-plus-jakarta-bold text-primary">Agregar Mascota</Text>
          </TouchableOpacity>
        </View>

        {/* Section: Favoritos */}
        <View className="mb-24">
          <Text className="text-[16px] font-plus-jakarta-bold text-on-surface mb-3">
            Mascotas Guardadas / Favoritos
          </Text>

          <View className="flex-row gap-3">
            {/* Fav 1 */}
            <Card className="flex-1 border border-border/40 bg-surface rounded-xl overflow-hidden p-2.5">
              <Image
                source={require("../../assets/images/lost_dog.png")}
                className="w-full h-24 rounded-lg bg-surface-muted"
                resizeMode="cover"
              />
              <Text className="text-[13px] font-plus-jakarta-bold text-on-surface mt-2">Simba</Text>
              <Text className="text-[11px] font-plus-jakarta text-on-surface-secondary mt-0.5">Refugio Patitas</Text>
            </Card>

            {/* Fav 2 */}
            <Card className="flex-1 border border-border/40 bg-surface rounded-xl overflow-hidden p-2.5">
              <Image
                source={require("../../assets/images/adoptable_puppy.png")}
                className="w-full h-24 rounded-lg bg-surface-muted"
                resizeMode="cover"
              />
              <Text className="text-[13px] font-plus-jakarta-bold text-on-surface mt-2">Bruno</Text>
              <Text className="text-[11px] font-plus-jakarta text-on-surface-secondary mt-0.5">Refugio La Helena</Text>
            </Card>
          </View>
        </View>

        {/* Settings & Sign Out Area */}
        <View className="gap-3 mb-24">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => Alert.alert("Configuración", "Abriendo configuración...")}
            className="w-full bg-surface border border-border h-[52px] rounded-xl flex-row items-center px-4 justify-between"
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="settings-outline" size={20} color={COLORS.onSurfaceSecondary} />
              <Text className="text-[14px] font-plus-jakarta-semibold text-on-surface">Configuración</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={COLORS.onSurfaceTertiary} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleSignOut}
            className="w-full bg-red-500/10 border border-red-500/20 h-[52px] rounded-xl flex-row items-center px-4 justify-center gap-2"
          >
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text className="text-[14px] font-plus-jakarta-bold text-red-500">Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
