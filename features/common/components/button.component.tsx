import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { cn } from "../lib/utils.lib";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
}

export const Button = ({
  label,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  className,
  textClassName,
}: ButtonProps) => {
  const getStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-primary active:bg-primary-light border-transparent";
      case "secondary":
        return "bg-secondary active:bg-secondary-light border-transparent";
      case "ghost":
        return "bg-transparent border-transparent";
      case "outline":
        return "bg-surface border-primary";
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case "primary":
      case "secondary":
        return "text-surface";
      case "ghost":
      case "outline":
        return "text-primary";
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(
        "h-[52px] px-[24px] py-[14px] rounded-full flex-row items-center justify-center border",
        getStyles(),
        disabled && "opacity-50",
        className
      )}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" || variant === "ghost" ? "#E8613A" : "#FFFFFF"}
          size="small"
        />
      ) : (
        <Text
          className={cn(
            "text-[13px] font-semibold tracking-[0.02em] font-inter",
            getTextStyles(),
            textClassName
          )}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
