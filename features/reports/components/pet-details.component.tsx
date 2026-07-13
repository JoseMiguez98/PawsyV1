import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Share } from "react-native";
import { Badge, BadgeType } from "@/features/common/components/badge.component";
import { Card } from "@/features/common/components/card.component";
import { COLORS } from "@/features/common/lib/constants.lib";
import { Ionicons } from "@expo/vector-icons";

export interface PetDetailsProps {
  id: string;
  name: string;
  type: "lost" | "found" | "adoption";
  badgeType: BadgeType;
  image: any;
  breed: string;
  color?: string;
  size?: string;
  location: string;
  time: string;
  description: string;
  tags?: string[];
  reporter: {
    name: string;
    avatar?: any;
    phone: string;
    role?: string;
  };
  onBack: () => void;
  onContact: () => void;
}

export const PetDetails = ({
  name,
  type,
  badgeType,
  image,
  breed,
  color,
  size,
  location,
  time,
  description,
  tags = ["Amigable", "Nivel de energía: Medio", "Entrenado"],
  reporter,
  onBack,
  onContact,
}: PetDetailsProps) => {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `PawsyApp - Ayúdanos: Mascota ${
          type === "lost" ? "Perdida" : type === "found" ? "Avistada" : "en Adopción"
        }: ${name}, un ${breed} en ${location}.`,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  return (
    <View className="flex-1 bg-surface-warm">
      {/* Detail Scroll */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        
        {/* Photo Container */}
        <View className="relative w-full h-[320px] bg-surface-muted">
          <Image source={image} className="w-full h-full" resizeMode="cover" />
          
          {/* Back button */}
          <TouchableOpacity
            onPress={onBack}
            className="absolute top-12 left-4 w-11 h-11 bg-surface/90 rounded-full items-center justify-center border border-border shadow-sm"
          >
            <Ionicons name="arrow-back" size={22} color={COLORS.onSurface} />
          </TouchableOpacity>

          {/* Share button */}
          <TouchableOpacity
            onPress={handleShare}
            className="absolute top-12 right-4 w-11 h-11 bg-surface/90 rounded-full items-center justify-center border border-border shadow-sm"
          >
            <Ionicons name="share-social-outline" size={22} color={COLORS.onSurface} />
          </TouchableOpacity>

          {/* Floating Category Badge */}
          <View className="absolute bottom-4 left-4">
            <Badge type={badgeType} className="shadow-md" />
          </View>
        </View>

        {/* Content Area */}
        <View className="px-screen-padding -mt-4 bg-surface-warm rounded-t-2xl pt-6 pb-32">
          
          {/* Primary Profile Header */}
          <View className="flex-row justify-between items-start mb-6">
            <View className="flex-1 pr-4">
              <Text className="text-[28px] font-plus-jakarta-extrabold text-on-surface leading-tight">
                {name}
              </Text>
              <View className="flex-row items-center gap-1.5 mt-2">
                <Ionicons name="location-outline" size={16} color={COLORS.primary} />
                <Text className="text-[14px] font-plus-jakarta-medium text-on-surface-secondary flex-1" numberOfLines={1}>
                  {location}
                </Text>
              </View>
            </View>

            {/* Quick status icon */}
            <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center border border-primary/20">
              <Ionicons name="paw" size={22} color={COLORS.primary} />
            </View>
          </View>

          {/* Contact Details Bento Box / Action buttons */}
          <View className="gap-3 mb-6">
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onContact}
              className="w-full bg-primary h-[52px] rounded-full flex-row items-center justify-center gap-2 shadow-sm"
            >
              <Ionicons name="chatbubble-ellipses-outline" size={18} color="#FFFFFF" />
              <Text className="text-[13px] font-plus-jakarta-bold text-surface">
                {type === "adoption" ? "Contactar para Adoptar" : "Enviar Mensaje Seguro"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleShare}
              className="w-full bg-surface border border-border h-[52px] rounded-full flex-row items-center justify-center gap-2"
            >
              <Ionicons name="share-outline" size={18} color={COLORS.primary} />
              <Text className="text-[13px] font-plus-jakarta-bold text-primary">
                Compartir Perfil
              </Text>
            </TouchableOpacity>
          </View>

          {/* Section: Su Historia */}
          <View className="bg-surface rounded-xl p-5 border border-border/50 mb-6">
            <Text className="text-[18px] font-plus-jakarta-bold text-on-surface mb-3">
              Su Historia
            </Text>
            <Text className="text-[14px] font-plus-jakarta text-on-surface-secondary leading-relaxed mb-4">
              {description}
            </Text>

            {/* Specs row */}
            {color && size && (
              <View className="flex-row gap-4 mb-4 border-t border-b border-border/50 py-3">
                <View className="flex-1">
                  <Text className="text-[10px] font-plus-jakarta-bold text-on-surface-tertiary uppercase">Color</Text>
                  <Text className="text-[13px] font-plus-jakarta-medium text-on-surface mt-0.5">{color}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-[10px] font-plus-jakarta-bold text-on-surface-tertiary uppercase">Tamaño</Text>
                  <Text className="text-[13px] font-plus-jakarta-medium text-on-surface mt-0.5">{size}</Text>
                </View>
              </View>
            )}

            {/* Tag List */}
            <View className="flex-row flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <View key={idx} className="bg-surface-muted px-3 py-1.5 rounded-lg">
                  <Text className="text-[12px] font-plus-jakarta text-on-surface-secondary">
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Section: Ubicación aproximada */}
          <View className="bg-surface rounded-xl p-5 border border-border/50 mb-6">
            <Text className="text-[16px] font-plus-jakarta-bold text-on-surface mb-3">
              Ubicación aproximada
            </Text>
            
            {/* Fake Map Box */}
            <View className="w-full h-40 bg-primary/5 rounded-xl border border-primary/10 overflow-hidden items-center justify-center mb-3">
              <Ionicons name="map-outline" size={48} color={COLORS.primary} className="opacity-30" />
              <View className="absolute bg-primary p-2 rounded-full shadow-sm">
                <Ionicons name="pin" size={18} color="#FFFFFF" />
              </View>
            </View>

            <Text className="text-[13px] font-plus-jakarta text-on-surface-secondary leading-relaxed">
              Refugio o zona de extravío: <Text className="font-plus-jakarta-semibold">{location}</Text>.
            </Text>
          </View>

          {/* Section: Responsable Info */}
          <Card className="border border-border/50 bg-surface-muted rounded-xl p-4 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 rounded-full bg-secondary-pale items-center justify-center border border-secondary/20">
                <Text className="text-[14px] font-plus-jakarta-bold text-secondary">
                  {reporter.name.split(" ").map(n => n[0]).join("")}
                </Text>
              </View>
              
              <View>
                <Text className="text-[10px] font-plus-jakarta-bold text-on-surface-tertiary uppercase">Responsable</Text>
                <Text className="text-[15px] font-plus-jakarta-bold text-on-surface mt-0.5">{reporter.name}</Text>
                <Text className="text-[12px] font-plus-jakarta text-on-surface-secondary">{reporter.role || "Miembro de la comunidad"}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={onContact}
              className="w-10 h-10 bg-surface rounded-full border border-border items-center justify-center shadow-sm"
            >
              <Ionicons name="call-outline" size={18} color={COLORS.secondary} />
            </TouchableOpacity>
          </Card>

        </View>
      </ScrollView>
    </View>
  );
};
