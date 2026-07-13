import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Alert, Linking } from "react-native";
import { Input } from "../../features/common/components/input.component";
import { Card } from "../../features/common/components/card.component";
import { Badge } from "../../features/common/components/badge.component";
import { Button } from "../../features/common/components/button.component";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../features/common/lib/constants.lib";
import { useRouter } from "expo-router";

interface MapMarker {
  id: string;
  type: "lost" | "found" | "shelter";
  name: string;
  breedOrDetails: string;
  distance: string;
  latOffset: number; // For styling mock map coordinates
  lngOffset: number;
  image: any;
}

const MOCK_MARKERS: MapMarker[] = [
  {
    id: "1",
    type: "lost",
    name: "Toby",
    breedOrDetails: "Golden Retriever • A 150m de ti",
    distance: "Hace 10 min",
    latOffset: 240,
    lngOffset: 80,
    image: require("../../assets/images/lost_dog.png"),
  },
  {
    id: "2",
    type: "found",
    name: "Mimi",
    breedOrDetails: "Gato Tabby • A 450m de ti",
    distance: "Hace 1 hora",
    latOffset: 160,
    lngOffset: 240,
    image: require("../../assets/images/found_cat.png"),
  },
  {
    id: "3",
    type: "shelter",
    name: "Refugio La Helena",
    breedOrDetails: "124 mascotas • A 1.2km de ti",
    distance: "Abierto hoy",
    latOffset: 340,
    lngOffset: 180,
    image: require("../../assets/images/adoptable_puppy.png"),
  },
];

interface Shelter {
  id: string;
  name: string;
  address: string;
  petsCount: number;
  image: any;
  phone: string;
}

const MOCK_SHELTERS: Shelter[] = [
  {
    id: "shelter-1",
    name: "Refugio La Helena",
    address: "KM 14.5 Carretera al Salvador, CABA",
    petsCount: 124,
    phone: "+5411998877",
    image: require("../../assets/images/adoptable_puppy.png"),
  },
  {
    id: "shelter-2",
    name: "Refugio Patitas",
    address: "Av. Las Américas 8-40, Colegiales",
    petsCount: 85,
    phone: "+5411887766",
    image: require("../../assets/images/lost_dog.png"),
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const [activeMode, setActiveMode] = useState<"mapa" | "refugios">("mapa");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>("1");

  const selectedMarker = MOCK_MARKERS.find((m) => m.id === selectedMarkerId);

  const handleMarkerPress = (id: string) => {
    setSelectedMarkerId(id);
  };

  const handleCallShelter = (phone: string, name: string) => {
    Alert.alert("Llamar", `¿Deseas llamar a ${name} al ${phone}?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Llamar", onPress: () => Linking.openURL(`tel:${phone}`) },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-warm">
      {/* Top Toggle Chip Selector */}
      <View className="flex-row px-screen-padding py-3 gap-2 bg-surface border-b border-border/30 z-10">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setActiveMode("mapa")}
          className={`flex-1 py-3 rounded-full border items-center justify-center ${
            activeMode === "mapa" ? "bg-secondary border-transparent" : "bg-surface border-border"
          }`}
        >
          <Text
            className={`text-[12px] font-plus-jakarta-bold ${
              activeMode === "mapa" ? "text-surface" : "text-on-surface-secondary"
            }`}
          >
            Mapa Activo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setActiveMode("refugios")}
          className={`flex-1 py-3 rounded-full border items-center justify-center ${
            activeMode === "refugios" ? "bg-secondary border-transparent" : "bg-surface border-border"
          }`}
        >
          <Text
            className={`text-[12px] font-plus-jakarta-bold ${
              activeMode === "refugios" ? "text-surface" : "text-on-surface-secondary"
            }`}
          >
            Directorios de Refugios
          </Text>
        </TouchableOpacity>
      </View>

      {activeMode === "mapa" ? (
        /* MAP MODE */
        <View className="flex-1 relative">
          {/* Mock Canvas Map styling (Green grass park blocks with roads) */}
          <View className="absolute inset-0 bg-secondary-pale/45 flex items-center justify-center overflow-hidden">
            {/* Styled Roads */}
            <View className="absolute w-[150%] h-10 bg-[#EFEBE9] rotate-12" />
            <View className="absolute w-[150%] h-12 bg-[#EFEBE9] -rotate-45" />
            <View className="absolute w-12 h-[150%] bg-[#EFEBE9] left-1/4" />
            <View className="absolute w-10 h-[150%] bg-[#EFEBE9] right-1/3" />

            {/* River/Water block */}
            <View className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-sky-200/40" />

            {/* Green park block */}
            <View className="absolute bottom-20 right-10 w-52 h-44 rounded-[40px] bg-secondary-pale/80 border border-secondary/10" />

            {/* Render Pins */}
            {MOCK_MARKERS.map((marker) => {
              const isSelected = selectedMarkerId === marker.id;
              
              // Define Pin color based on type
              let pinBg = "bg-primary";
              if (marker.type === "found") pinBg = "bg-badge-avistado";
              if (marker.type === "shelter") pinBg = "bg-secondary";

              return (
                <TouchableOpacity
                  key={marker.id}
                  onPress={() => handleMarkerPress(marker.id)}
                  style={{
                    position: "absolute",
                    top: marker.latOffset,
                    left: marker.lngOffset,
                  }}
                  className="items-center"
                >
                  <View
                    className={`w-10 h-10 rounded-full border-2 border-surface items-center justify-center shadow-lg ${pinBg} ${
                      isSelected ? "scale-125 border-surface shadow-2xl" : ""
                    }`}
                  >
                    <Ionicons 
                      name={marker.type === "shelter" ? "home" : "paw"} 
                      size={18} 
                      color="#FFFFFF" 
                    />
                  </View>
                  <View className="bg-surface/90 px-2 py-0.5 rounded-full mt-1 border border-border/80 shadow-sm">
                    <Text className="text-[9px] font-plus-jakarta-bold text-on-surface">
                      {marker.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Map Overlay Search Input */}
          <View className="absolute top-4 left-screen-padding right-screen-padding">
            <View className="relative">
              <Input
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Buscar por raza, color o dirección..."
                containerClassName="shadow-lg shadow-on-surface/5"
                className="bg-surface border-border"
              />
              <TouchableOpacity className="absolute right-4 bottom-3">
                <Ionicons name="search" size={20} color={COLORS.onSurfaceSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Floating Details Popup Bottom Sheet */}
          {selectedMarker && (
            <View className="absolute bottom-6 left-screen-padding right-screen-padding">
              <Card className="border border-border shadow-2xl bg-surface p-4 rounded-2xl">
                <View className="flex-row gap-4">
                  <Image
                    source={selectedMarker.image}
                    className="w-16 h-16 rounded-xl bg-surface-muted"
                    resizeMode="cover"
                  />
                  <View className="flex-1 justify-between">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-[16px] font-plus-jakarta-bold text-on-surface">
                        {selectedMarker.name}
                      </Text>
                      <Badge 
                        type={
                          selectedMarker.type === "shelter" 
                            ? "adoptable" 
                            : selectedMarker.type === "lost" 
                            ? "perdido" 
                            : "avistado"
                        } 
                      />
                    </View>
                    <Text className="text-[12px] font-plus-jakarta text-on-surface-secondary mt-0.5">
                      {selectedMarker.breedOrDetails}
                    </Text>
                    <Text className="text-[11px] font-plus-jakarta text-on-surface-tertiary">
                      {selectedMarker.distance}
                    </Text>
                  </View>
                </View>

                {/* Actions inside card */}
                <View className="flex-row gap-2 mt-4">
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      if (selectedMarker.type === "shelter") {
                        setActiveMode("refugios");
                      } else {
                        router.push(`/report/${selectedMarker.id}`);
                      }
                    }}
                    className="flex-1 bg-primary h-[44px] rounded-full items-center justify-center"
                  >
                    <Text className="text-[12px] font-plus-jakarta-bold text-surface">
                      {selectedMarker.type === "shelter" ? "Ver Refugio" : "Ver Detalles"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      if (selectedMarker.type === "shelter") {
                        const shelter = MOCK_SHELTERS.find(s => s.name === selectedMarker.name);
                        if (shelter) handleCallShelter(shelter.phone, shelter.name);
                      } else {
                        Alert.alert("Contactar", "Conectando al chat encriptado...");
                      }
                    }}
                    className="flex-1 bg-surface border border-border h-[44px] rounded-full items-center justify-center"
                  >
                    <Text className="text-[12px] font-plus-jakarta-bold text-on-surface-secondary">
                      {selectedMarker.type === "shelter" ? "Llamar" : "Contactar"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </View>
          )}
        </View>
      ) : (
        /* SHELTERS DIRECTORY MODE */
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-screen-padding pt-4">
          {/* Header search inside list */}
          <View className="relative mb-5">
            <Input
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar refugio por nombre o dirección..."
              className="bg-surface border-border"
            />
            <TouchableOpacity className="absolute right-4 bottom-3">
              <Ionicons name="search" size={20} color={COLORS.onSurfaceSecondary} />
            </TouchableOpacity>
          </View>

          {/* Shelter directory title */}
          <Text className="text-[18px] font-plus-jakarta-bold text-on-surface mb-3">
            Refugios Cercanos
          </Text>

          {/* Shelter List */}
          <View className="gap-4 mb-6">
            {MOCK_SHELTERS.map((shelter) => (
              <Card key={shelter.id} className="border border-border/60 bg-surface rounded-2xl p-4 flex-row gap-4">
                <Image
                  source={shelter.image}
                  className="w-20 h-20 rounded-xl bg-surface-muted"
                  resizeMode="cover"
                />
                
                <View className="flex-1 justify-between">
                  <View>
                    <Text className="text-[15px] font-plus-jakarta-bold text-on-surface">
                      {shelter.name}
                    </Text>
                    <Text className="text-[11px] font-plus-jakarta text-on-surface-secondary mt-0.5 leading-relaxed" numberOfLines={2}>
                      {shelter.address}
                    </Text>
                  </View>

                  <View className="flex-row justify-between items-center mt-2">
                    <View className="flex-row items-center gap-1">
                      <Ionicons name="paw-outline" size={12} color={COLORS.secondary} />
                      <Text className="text-[11px] font-plus-jakarta-bold text-secondary">
                        {shelter.petsCount} rescatados
                      </Text>
                    </View>

                    <View className="flex-row gap-2">
                      <TouchableOpacity 
                        onPress={() => handleCallShelter(shelter.phone, shelter.name)}
                        className="w-8 h-8 rounded-full bg-secondary-pale items-center justify-center"
                      >
                        <Ionicons name="call" size={14} color={COLORS.secondary} />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => Alert.alert("Donación", `Abriendo pasarela de pago para ${shelter.name}...`)}
                        className="px-3 h-8 bg-secondary rounded-full items-center justify-center"
                      >
                        <Text className="text-[10px] font-plus-jakarta-bold text-surface">Donar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          {/* Shelter Newsletter Section */}
          <Text className="text-[16px] font-plus-jakarta-bold text-on-surface mb-3">
            Novedades y Campañas
          </Text>

          <Card className="border border-border/50 bg-[#E8F5E9] rounded-2xl p-4 mb-24">
            <View className="flex-row justify-between items-center mb-2">
              <View className="bg-secondary px-2.5 py-0.5 rounded-full">
                <Text className="text-[9px] font-plus-jakarta-bold text-white uppercase">Campaña</Text>
              </View>
              <Text className="text-[11px] font-plus-jakarta text-secondary">25 de Mayo</Text>
            </View>
            <Text className="text-[15px] font-plus-jakarta-bold text-[#1B5E20] mb-1">
              Vacunación Anual Gratuita
            </Text>
            <Text className="text-[12px] font-plus-jakarta text-[#1B5E20]/90 leading-relaxed mb-3">
              Organizado por Refugio La Helena. Trae a tu perro o gato para vacunación quíntuple y antirrábica sin costo.
            </Text>
            <TouchableOpacity 
              onPress={() => Alert.alert("Registro", "Te has registrado para recibir notificaciones de la campaña.")}
              className="bg-white border border-[#1B5E20]/20 h-[36px] rounded-full items-center justify-center"
            >
              <Text className="text-[12px] font-plus-jakarta-bold text-[#1B5E20]">Quiero asistir</Text>
            </TouchableOpacity>
          </Card>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
