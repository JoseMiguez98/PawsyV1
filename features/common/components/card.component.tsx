import React from "react";
import { View, ViewProps } from "react-native";
import { cn } from "../lib/utils.lib";

interface CardProps extends ViewProps {
  variant?: "standard" | "featured";
  className?: string;
  children: React.ReactNode;
}

export const Card = ({
  variant = "standard",
  className,
  children,
  ...props
}: CardProps) => {
  return (
    <View
      className={cn(
        "bg-surface overflow-hidden",
        variant === "standard" ? "rounded-lg p-4 shadow-sm shadow-on-surface/5" : "rounded-xl p-0",
        className
      )}
      style={variant === "standard" ? { elevation: 2 } : undefined}
      {...props}
    >
      {children}
    </View>
  );
};
