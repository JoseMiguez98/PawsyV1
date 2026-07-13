import React, { useState } from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { cn } from "../lib/utils.lib";

interface InputProps extends Omit<TextInputProps, "className"> {
  label?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
}

export const Input = ({
  label,
  error,
  className,
  containerClassName,
  onFocus,
  onBlur,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={cn("flex-col gap-2", containerClassName)}>
      {label && (
        <Text className="text-[10px] font-bold tracking-[0.1em] text-on-surface-secondary uppercase font-inter">
          {label}
        </Text>
      )}
      <TextInput
        className={cn(
          "h-[52px] px-4 rounded-md bg-surface-muted text-on-surface text-[14px] font-inter border-2 border-transparent",
          isFocused && "bg-surface border-primary",
          error && "border-error bg-surface",
          className
        )}
        placeholderTextColor="#9E9E9E" // on-surface-tertiary
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        {...props}
      />
      {error && (
        <Text className="text-[12px] text-error font-inter mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};
