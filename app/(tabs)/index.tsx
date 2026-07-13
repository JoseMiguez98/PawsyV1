import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { Badge, BadgeType } from "../../features/common/components/badge.component";
import { Card } from "../../features/common/components/card.component";
import { COLORS } from "../../features/common/lib/constants.lib";
import { Ionicons } from "@expo/vector-icons";

interface ReportItem {
  id: string;
  name: string;
  type: "lost" | "found" | "adoption";
  badgeType: BadgeType;
  image: any;
  breed: string;
  location: string;
  time: string;
  description: string;
  authorInitials: string;
}

const MOCK_REPORTS: ReportItem[] = [
  {
    id: "1",
    name: "Cachorro triste en el parque",
    type: "found",
    badgeType: "avistado",
    image: require("../../assets/images/found_cat.png"), // Using available assets
    breed: "Cachorro mestizo",
    location: "Parque Central, Zona 10",
    time: "Hace 2 horas",
    description: "Es un cachorro pequeño, color café, parece asustado y busca comida.",
    authorInitials: "M",
  },
  {
    id: "2",
    name: "Gata \"Minina\"",
    type: "lost",
    badgeType: "perdido",
    image: require("../../assets/images/lost_dog.png"),
    breed: "Siamesa de ojos azules",
    location: "Residenciales El Sol",
    time: "Hace 5 horas",
    description: "Tiene un collar rosa con cascabel. Responde a su nombre 'Minina'.",
    authorInitials: "JD",
  },
  {
    id: "3",
    name: "Puppi",
    type: "adoption",
    badgeType: "adoptable",
    image: require("../../assets/images/adoptable_puppy.png"),
    breed: "Cocker Spaniel",
    location: "Refugio La Helena",
    time: "Activo",
    description: "Tiene 2 años, vacunada, muy dulce y juguetona con niños.",
    authorInitials: "RH",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<"todos" | "lost" | "found" | "adoption">("todos");

  const filteredReports = activeFilter === "todos"
    ? MOCK_REPORTS
    : MOCK_REPORTS.filter((r) => r.type === activeFilter);

  return (
    <SafeAreaView className="flex-1 bg-surface-warm">
      <StatusBar barStyle="dark-content" />
      
      {/* Top App Bar */}
      <View className="px-screen-padding pt-4 pb-2 flex-row justify-between items-center bg-surface-warm">
        <View>
          <View className="bg-primary-pale px-2 py-0.5 rounded-full self-start mb-1">
            <Text className="text-[9px] font-plus-jakarta-extrabold tracking-[0.1em] text-primary uppercase">
              Comunidad Pawsy
            </Text>
          </View>
          <Text className="text-[24px] font-plus-jakarta-extrabold text-on-surface">
            PawsyApp
          </Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.push("/(tabs)/search")}
          className="w-11 h-11 bg-surface rounded-full items-center justify-center border border-border shadow-sm"
        >
          <Ionicons name="search" size={20} color={COLORS.onSurfaceSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-screen-padding">
        {/* Hero Section */}
        <View className="my-5">
          <Text className="text-[28px] font-plus-jakarta-extrabold tracking-tight text-on-surface leading-[1.2]">
            Ayúdanos a traerlos{"\n"}de vuelta a casa.
          </Text>
        </View>

        {/* Bento Grid Section */}
        <View className="flex-row gap-4 mb-6">
          {/* Mascotas Perdidas (Left Card) */}
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={() => router.push("/(tabs)/alerts")}
            className="flex-1 h-52 bg-primary-pale rounded-xl border border-border/30 overflow-hidden justify-between p-4"
          >
            <View>
              <View className="bg-badge-perdido/10 px-2 py-1 rounded-md self-start mb-2">
                <Text className="text-[10px] font-plus-jakarta-bold text-badge-perdido uppercase">Perdidos</Text>
              </View>
              <Text className="text-[16px] font-plus-jakarta-bold text-on-surface leading-tight">
                Mascotas{"\n"}Perdidas
              </Text>
              <Text className="text-[12px] font-plus-jakarta text-on-surface-secondary mt-1">
                Ayuda a buscar en tu zona.
              </Text>
            </View>
            <Text className="text-[12px] font-plus-jakarta-bold text-primary underline">
              Ver todos los reportes
            </Text>
          </TouchableOpacity>

          {/* En Adopción (Right Card) */}
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={() => router.push("/(tabs)/search")}
            className="flex-1 h-52 bg-secondary-pale rounded-xl border border-border/30 overflow-hidden justify-between p-4"
          >
            <View>
              <View className="bg-badge-adoptable/10 px-2 py-1 rounded-md self-start mb-2">
                <Text className="text-[10px] font-plus-jakarta-bold text-badge-adoptable uppercase">Adopción</Text>
              </View>
              <Text className="text-[16px] font-plus-jakarta-bold text-on-surface leading-tight">
                En Adopción
              </Text>
              <Text className="text-[12px] font-plus-jakarta text-on-surface-secondary mt-1">
                Un amigo fiel te está esperando.
              </Text>
            </View>
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => router.push("/(tabs)/search")}
              className="bg-secondary px-3 py-2 rounded-full items-center justify-center"
            >
              <Text className="text-[11px] font-plus-jakarta-bold text-surface">
                Conocer mascotas
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Section Heading: Cerca de ti */}
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center gap-2">
            <Text className="text-[18px] font-plus-jakarta-bold text-on-surface">
              Cerca de ti
            </Text>
            <View className="bg-surface border border-border px-2 py-0.5 rounded-full">
              <Text className="text-[10px] font-plus-jakarta-semibold text-on-surface-secondary">
                Radio de 5km
              </Text>
            </View>
          </View>
          
          {/* Quick toggle list icon */}
          <Ionicons name="options-outline" size={20} color={COLORS.onSurfaceSecondary} />
        </View>

        {/* Filter Chips row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row mb-5 -mx-screen-padding px-screen-padding"
        >
          {[
            { id: "todos", label: "Todos" },
            { id: "lost", label: "Perdidos" },
            { id: "found", label: "Avistados" },
            { id: "adoption", label: "Adopciones" }
          ].map((chip) => {
            const isSelected = activeFilter === chip.id;
            return (
              <TouchableOpacity
                key={chip.id}
                onPress={() => setActiveFilter(chip.id as any)}
                className={`mr-2.5 px-4 py-2 rounded-full border ${
                  isSelected
                    ? "bg-secondary border-secondary"
                    : "bg-surface border-border"
                }`}
              >
                <Text
                  className={`text-[12px] font-plus-jakarta-semibold ${
                    isSelected ? "text-surface" : "text-on-surface-secondary"
                  }`}
                >
                  {chip.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Feed List */}
        <View className="gap-4 mb-6">
          {filteredReports.map((report) => (
            <TouchableOpacity
              key={report.id}
              activeOpacity={0.95}
              onPress={() => router.push(`/report/${report.id}`)}
            >
              <Card className="border border-border p-4 bg-surface rounded-xl">
                <View className="flex-row gap-4">
                  {/* Thumbnail Image */}
                  <Image
                    source={report.image}
                    className="w-24 h-24 rounded-lg bg-surface-muted"
                    resizeMode="cover"
                  />

                  {/* Details content */}
                  <View className="flex-1 justify-between py-0.5">
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1 pr-2">
                        <Text className="text-[16px] font-plus-jakarta-bold text-on-surface leading-tight" numberOfLines={1}>
                          {report.name}
                        </Text>
                        <Text className="text-[12px] font-plus-jakarta-medium text-on-surface-secondary mt-0.5">
                          {report.breed}
                        </Text>
                      </View>
                      <Badge type={report.badgeType} />
                    </View>

                    <View className="flex-row items-center gap-1">
                      <Ionicons name="location-outline" size={13} color={COLORS.onSurfaceTertiary} />
                      <Text className="text-[11px] text-on-surface-secondary font-plus-jakarta flex-1" numberOfLines={1}>
                        {report.location}
                      </Text>
                    </View>

                    <View className="flex-row justify-between items-center mt-1">
                      {/* Left side: Avatar + time */}
                      <View className="flex-row items-center gap-1.5">
                        <View className="w-5 h-5 rounded-full bg-primary-pale items-center justify-center border border-primary/20">
                          <Text className="text-[9px] font-plus-jakarta-extrabold text-primary">
                            {report.authorInitials}
                          </Text>
                        </View>
                        <Text className="text-[11px] text-on-surface-tertiary font-plus-jakarta">
                          {report.time}
                        </Text>
                      </View>

                      {/* Right side: details action */}
                      <View className="bg-primary/5 px-2.5 py-1 rounded-full">
                        <Text className="text-[11px] font-plus-jakarta-bold text-primary">
                          Detalles
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA Footer Card: ¿Viste a una mascota? */}
        <View className="mb-28 rounded-2xl bg-secondary p-5 border border-border/20 overflow-hidden relative">
          {/* Asymmetric Decor elements */}
          <View className="absolute -right-6 -bottom-6 opacity-10">
            <Ionicons name="paw" size={100} color="#FFFFFF" />
          </View>
          
          <Text className="text-[18px] font-plus-jakarta-bold text-surface leading-tight mb-2">
            ¿Viste a una mascota?
          </Text>
          <Text className="text-[13px] font-plus-jakarta text-surface/90 leading-relaxed mb-4 pr-10">
            Tu reporte puede devolver la alegría a una familia. Registra el avistamiento de forma anónima y segura.
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push("/(tabs)/report")}
            className="bg-surface px-5 py-3 rounded-full items-center justify-center self-start"
          >
            <Text className="text-[13px] font-plus-jakarta-bold text-secondary">
              Crear Reporte
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
