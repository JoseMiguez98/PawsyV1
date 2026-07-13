import React from "react";
import { View, Text } from "react-native";
import { cn } from "../lib/utils.lib";

export type BadgeType = "perdido" | "avistado" | "adoptable" | "urgente";

interface BadgeProps {
  type: BadgeType;
  label?: string;
  className?: string;
}

export const Badge = ({ type, label, className }: BadgeProps) => {
  const getBadgeStyle = () => {
    switch (type) {
      case "perdido":
        return "bg-badge-perdido rounded-sm px-[8px] py-[3px]";
      case "avistado":
        return "bg-badge-avistado rounded-sm px-[8px] py-[3px]";
      case "adoptable":
        return "bg-badge-adoptable rounded-full px-[10px] py-[4px]";
      case "urgente":
        return "bg-badge-urgente rounded-full px-[10px] py-[4px]";
    }
  };

  const getLabel = () => {
    if (label) return label.toUpperCase();
    switch (type) {
      case "perdido":
        return "PERDIDO";
      case "avistado":
        return "AVISTADO";
      case "adoptable":
        return "ADOPTABLE";
      case "urgente":
        return "URGENTE";
    }
  };

  return (
    <View className={cn("self-start items-center justify-center", getBadgeStyle(), className)}>
      <Text className="text-[10px] font-bold tracking-[0.1em] text-surface font-inter leading-none">
        {getLabel()}
      </Text>
    </View>
  );
};
