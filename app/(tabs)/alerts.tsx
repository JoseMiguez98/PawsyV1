import React, { useState } from "react";
import { View, Text, ScrollView, Image, SafeAreaView, TouchableOpacity, Alert, Share } from "react-native";
import { Card } from "../../features/common/components/card.component";
import { Badge } from "../../features/common/components/badge.component";
import { COLORS } from "../../features/common/lib/constants.lib";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AlertsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"comunidad" | "mensajes">("comunidad");

  const handleShare = async (title: string) => {
    try {
      await Share.share({
        message: `PawsyApp Alerta: ${title}. Ayúdanos a difundir esta publicación.`,
      });
    } catch (e) {
      console.log("Error sharing:", e);
    }
  };

  const handleMessageAction = (name: string) => {
    Alert.alert("Chat Seguro", `Iniciando chat encriptado con ${name}...`);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-warm">
      {/* Top App Bar */}
      <View className="px-screen-padding pt-4 pb-3 flex-row justify-between items-center bg-surface-warm border-b border-border/30">
        <View>
          <Text className="text-[24px] font-plus-jakarta-extrabold text-on-surface">
            Comunidad y Mensajes
          </Text>
        </View>
      </View>

      {/* Switch Tab Filter Chips */}
      <View className="flex-row px-screen-padding py-4 gap-2 bg-surface-warm">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setActiveTab("comunidad")}
          className={`flex-1 py-3 rounded-full border items-center justify-center ${
            activeTab === "comunidad" ? "bg-secondary border-transparent" : "bg-surface border-border"
          }`}
        >
          <Text
            className={`text-[12px] font-plus-jakarta-bold ${
              activeTab === "comunidad" ? "text-surface" : "text-on-surface-secondary"
            }`}
          >
            Publicaciones
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setActiveTab("mensajes")}
          className={`flex-1 py-3 rounded-full border items-center justify-center ${
            activeTab === "mensajes" ? "bg-secondary border-transparent" : "bg-surface border-border"
          }`}
        >
          <Text
            className={`text-[12px] font-plus-jakarta-bold ${
              activeTab === "mensajes" ? "text-surface" : "text-on-surface-secondary"
            }`}
          >
            Mensajes
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-screen-padding">
        {activeTab === "comunidad" ? (
          /* Comunidad Active Feed */
          <View className="gap-5 pb-28">
            
            {/* 1. Urgent Alert Card */}
            <Card className="border border-red-500/20 bg-surface rounded-2xl p-4 shadow-sm">
              <View className="flex-row justify-between items-center mb-3">
                <View className="bg-red-500 px-2.5 py-0.5 rounded-full">
                  <Text className="text-[9px] font-plus-jakarta-extrabold text-white uppercase">
                    Urgente
                  </Text>
                </View>
                <Text className="text-[11px] font-plus-jakarta text-on-surface-tertiary">
                  Hace 15 min
                </Text>
              </View>

              <Text className="text-[16px] font-plus-jakarta-bold text-on-surface mb-1">
                Husky visto corriendo en autopista
              </Text>
              
              <Text className="text-[13px] font-plus-jakarta text-on-surface-secondary leading-relaxed mb-4">
                Visto cerca de la salida 4. Se encuentra asustado y esquivando vehículos. Corre peligro debido al tráfico pesado.
              </Text>

              {/* Actions row */}
              <View className="flex-row gap-3">
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => Alert.alert("Mapa de Alerta", "Mostrando ubicación aproximada en el mapa...")}
                  className="flex-1 bg-primary-pale h-[44px] rounded-full flex-row items-center justify-center gap-1.5 border border-primary/20"
                >
                  <Ionicons name="map-outline" size={16} color={COLORS.primary} />
                  <Text className="text-[12px] font-plus-jakarta-bold text-primary">
                    Ver Ubicación
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => handleShare("Husky visto en autopista")}
                  className="w-11 h-[44px] bg-surface-muted rounded-full border border-border items-center justify-center"
                >
                  <Ionicons name="share-social-outline" size={16} color={COLORS.onSurfaceSecondary} />
                </TouchableOpacity>
              </View>
            </Card>

            {/* 2. Shelter Update Card */}
            <Card className="border border-border/50 bg-surface rounded-2xl p-4">
              <View className="flex-row justify-between items-center mb-3">
                <View className="bg-secondary-pale px-2.5 py-0.5 rounded-full border border-secondary/25">
                  <Text className="text-[9px] font-plus-jakarta-bold text-secondary uppercase">
                    Refugio
                  </Text>
                </View>
                <Text className="text-[11px] font-plus-jakarta text-on-surface-tertiary">
                  Hace 2 horas
                </Text>
              </View>

              <Text className="text-[15px] font-plus-jakarta-bold text-on-surface mb-3">
                Refugio La Helena subió un nuevo perro
              </Text>

              {/* Nested preview pet card */}
              <View className="flex-row gap-3 bg-surface-warm p-3 rounded-xl border border-border/40 mb-3">
                <Image
                  source={require("../../assets/images/lost_dog.png")} // using available assets
                  className="w-16 h-16 rounded-lg"
                  resizeMode="cover"
                />
                <View className="flex-1 justify-center">
                  <Text className="text-[15px] font-plus-jakarta-bold text-on-surface">Tobi</Text>
                  <Text className="text-[12px] font-plus-jakarta-medium text-on-surface-secondary mt-0.5">Golden Retriever, 2 años</Text>
                  <View className="flex-row items-center gap-1 mt-1">
                    <Ionicons name="location-outline" size={12} color={COLORS.onSurfaceSecondary} />
                    <Text className="text-[11px] text-on-surface-secondary font-plus-jakarta" numberOfLines={1}>CABA, Buenos Aires</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => router.push("/report/1")} // link to details
                className="w-full bg-surface border border-border h-[40px] rounded-full items-center justify-center"
              >
                <Text className="text-[12px] font-plus-jakarta-bold text-on-surface-secondary">
                  Conocer a Tobi
                </Text>
              </TouchableOpacity>
            </Card>

            {/* 3. Success Story Card (Green background) */}
            <Card className="border border-secondary/10 bg-secondary-pale rounded-2xl p-4">
              <View className="flex-row justify-between items-center mb-3">
                <View className="bg-secondary px-2.5 py-0.5 rounded-full">
                  <Text className="text-[9px] font-plus-jakarta-bold text-white uppercase">
                    ¡Final Feliz!
                  </Text>
                </View>
                <Text className="text-[11px] font-plus-jakarta text-secondary/70">
                  Ayer
                </Text>
              </View>

              <Text className="text-[16px] font-plus-jakarta-bold text-secondary mb-1">
                ¡Mina ha vuelto a casa!
              </Text>
              
              <Text className="text-[13px] font-plus-jakarta text-secondary/90 leading-relaxed mb-1">
                Gracias a los reportes de avistamiento y notificaciones en PawsyApp, Mina ya se reunió con su familia después de 3 días perdida. ¡Gracias comunidad!
              </Text>
            </Card>

          </View>
        ) : (
          /* Mensajes Inbox Feed */
          <View className="gap-3 pb-28">
            
            {/* Message Item 1 */}
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => handleMessageAction("Marta Rodriguez")}
              className="bg-surface rounded-2xl p-4 border border-border/50 flex-row gap-4 items-center"
            >
              <View className="w-12 h-12 bg-primary-pale rounded-full items-center justify-center border border-primary/20">
                <Text className="text-[14px] font-plus-jakarta-bold text-primary">MR</Text>
              </View>
              
              <View className="flex-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[15px] font-plus-jakarta-bold text-on-surface">
                    Marta Rodriguez
                  </Text>
                  <Text className="text-[11px] font-plus-jakarta text-on-surface-tertiary">
                    Hace 10 min
                  </Text>
                </View>
                <Text className="text-[13px] font-plus-jakarta text-on-surface-secondary mt-1" numberOfLines={1}>
                  Hola, la gata que reportaste coincide con una...
                </Text>
              </View>

              <View className="w-2.5 h-2.5 bg-primary rounded-full" />
            </TouchableOpacity>

            {/* Message Item 2 */}
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => handleMessageAction("Refugio Patitas")}
              className="bg-surface rounded-2xl p-4 border border-border/50 flex-row gap-4 items-center"
            >
              <View className="w-12 h-12 bg-secondary-pale rounded-full items-center justify-center border border-secondary/20">
                <Text className="text-[14px] font-plus-jakarta-bold text-secondary">RP</Text>
              </View>
              
              <View className="flex-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[15px] font-plus-jakarta-bold text-on-surface">
                    Refugio Patitas
                  </Text>
                  <Text className="text-[11px] font-plus-jakarta text-on-surface-tertiary">
                    Ayer
                  </Text>
                </View>
                <Text className="text-[13px] font-plus-jakarta text-on-surface-secondary mt-1" numberOfLines={1}>
                  ¡Hola! Sí, Milo está disponible para conocer hoy...
                </Text>
              </View>
            </TouchableOpacity>

          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
