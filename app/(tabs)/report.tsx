import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { reportFormSchema, ReportFormValues } from "../../features/reports/lib/report-validation.lib";
import { Input } from "../../features/common/components/input.component";
import { Button } from "../../features/common/components/button.component";
import { COLORS } from "../../features/common/lib/constants.lib";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ReportScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Get current date/time formatted
  const getTodayDateStr = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return `${dd} / ${mm} / ${yyyy}`;
  };

  const getCurrentTimeStr = () => {
    const today = new Date();
    let hours = today.getHours();
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    return `${hours}:${minutes} ${ampm}`;
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      type: "lost",
      species: "dog",
      breed: "",
      color: "",
      size: "medium",
      address: "",
      date: getTodayDateStr(),
      time: getCurrentTimeStr(),
      description: "",
    },
  });

  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Necesitamos acceso a tu galería para poder seleccionar fotos."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (e) {
      console.log("Error selecting image:", e);
      Alert.alert("Error", "Ocurrió un error al seleccionar la imagen.");
    }
  };

  const onSubmit = async (data: ReportFormValues) => {
    if (!imageUri) {
      Alert.alert("Foto requerida", "Por favor, sube una foto de la mascota para facilitar su identificación.");
      return;
    }

    setLoading(true);
    // Simulate API request and visual similarity matching trigger
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Reporte Publicado",
        "Tu reporte ha sido subido con éxito. Iniciamos la búsqueda inteligente en la zona.",
        [
          {
            text: "Ver Resultados",
            onPress: () => {
              reset();
              setImageUri(null);
              router.push("/(tabs)");
            },
          },
        ]
      );
    }, 1800);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-warm">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header App Bar */}
        <View className="px-screen-padding pt-4 pb-3 flex-row justify-between items-center bg-surface-warm border-b border-border/30">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()} className="p-1">
              <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
            </TouchableOpacity>
            <Text className="text-[20px] font-plus-jakarta-extrabold text-on-surface">
              Reportar Mascota
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-screen-padding">
          {/* Hero Editorial Section */}
          <View className="my-5">
            <View className="bg-primary px-2 py-0.5 rounded-full self-start mb-2">
              <Text className="text-[9px] font-plus-jakarta-extrabold tracking-[0.1em] text-surface uppercase">
                Emergencia
              </Text>
            </View>
            <Text className="text-[28px] font-plus-jakarta-extrabold tracking-tight text-on-surface leading-[1.2] mb-2">
              Ayúdanos a traerlos{"\n"}de vuelta a casa.
            </Text>
            <Text className="text-[14px] font-plus-jakarta text-on-surface-secondary leading-relaxed">
              Completa los detalles de la mascota para que nuestra comunidad pueda estar alerta y colaborar en la búsqueda.
            </Text>
          </View>

          {/* Form container */}
          <View className="gap-5 pb-32">
            
            {/* Photo Uploader */}
            <View className="flex-col gap-2">
              <Text className="text-[11px] font-plus-jakarta-bold tracking-[0.1em] text-on-surface-secondary uppercase">
                Foto de la Mascota *
              </Text>
              
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handlePickImage}
                className={`h-48 rounded-2xl border-2 border-dashed flex-col items-center justify-center bg-surface overflow-hidden ${
                  imageUri ? "border-secondary bg-secondary-pale/10" : "border-border/80"
                }`}
              >
                {imageUri ? (
                  <View className="relative w-full h-full">
                    <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="cover" />
                    <View className="absolute top-2 right-2 bg-secondary px-3 py-1.5 rounded-full flex-row items-center gap-1 shadow-md">
                      <Ionicons name="camera" size={14} color="#FFFFFF" />
                      <Text className="text-[10px] font-plus-jakarta-bold text-surface">Cambiar foto</Text>
                    </View>
                  </View>
                ) : (
                  <View className="items-center p-4">
                    <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mb-3">
                      <Ionicons name="camera-outline" size={24} color={COLORS.primary} />
                    </View>
                    <Text className="text-[14px] font-plus-jakarta-bold text-primary">
                      Subir Foto de Mascota
                    </Text>
                    <Text className="text-[11px] text-on-surface-tertiary font-plus-jakarta text-center mt-1">
                      Soporta fotos JPG o PNG desde tu cámara o galería
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Report Type Selector */}
            <View className="flex-col gap-2">
              <Text className="text-[11px] font-plus-jakarta-bold tracking-[0.1em] text-on-surface-secondary uppercase">
                Tipo de Reporte
              </Text>
              <Controller
                control={control}
                name="type"
                render={({ field: { value, onChange } }) => (
                  <View className="flex-row gap-2">
                    {[
                      { id: "lost", label: "Perdido", activeColor: "bg-primary" },
                      { id: "found", label: "Avistado", activeColor: "bg-badge-avistado" },
                      { id: "adoption", label: "Adopción", activeColor: "bg-badge-adoptable" }
                    ].map((item) => {
                      const isSelected = value === item.id;
                      return (
                        <TouchableOpacity
                          key={item.id}
                          activeOpacity={0.9}
                          onPress={() => onChange(item.id)}
                          className={`flex-1 py-3.5 rounded-full border items-center justify-center ${
                            isSelected ? `${item.activeColor} border-transparent` : "bg-surface border-border"
                          }`}
                        >
                          <Text
                            className={`text-[12px] font-plus-jakarta-bold ${
                              isSelected ? "text-surface" : "text-on-surface-secondary"
                            }`}
                          >
                            {item.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              />
            </View>

            {/* Species Selector */}
            <View className="flex-col gap-2">
              <Text className="text-[11px] font-plus-jakarta-bold tracking-[0.1em] text-on-surface-secondary uppercase">
                Especie
              </Text>
              <Controller
                control={control}
                name="species"
                render={({ field: { value, onChange } }) => (
                  <View className="flex-row gap-2">
                    {[
                      { id: "dog", label: "Perro" },
                      { id: "cat", label: "Gato" },
                      { id: "other", label: "Otro" }
                    ].map((item) => {
                      const isSelected = value === item.id;
                      return (
                        <TouchableOpacity
                          key={item.id}
                          activeOpacity={0.9}
                          onPress={() => onChange(item.id)}
                          className={`flex-1 py-3.5 rounded-full border items-center justify-center ${
                            isSelected ? "bg-secondary border-transparent" : "bg-surface border-border"
                          }`}
                        >
                          <Text
                            className={`text-[12px] font-plus-jakarta-bold ${
                              isSelected ? "text-surface" : "text-on-surface-secondary"
                            }`}
                          >
                            {item.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              />
            </View>

            {/* Breed Input */}
            <Controller
              control={control}
              name="breed"
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  label="Raza / Característica"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Ej: Golden Retriever, Criollo..."
                  error={errors.breed?.message}
                />
              )}
            />

            {/* Color Input */}
            <Controller
              control={control}
              name="color"
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  label="Color Principal *"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Ej: Dorado, Negro con patas blancas..."
                  error={errors.color?.message}
                />
              )}
            />

            {/* Size Selector */}
            <View className="flex-col gap-2">
              <Text className="text-[11px] font-plus-jakarta-bold tracking-[0.1em] text-on-surface-secondary uppercase">
                Tamaño
              </Text>
              <Controller
                control={control}
                name="size"
                render={({ field: { value, onChange } }) => (
                  <View className="flex-row gap-2">
                    {[
                      { id: "small", label: "Pequeño" },
                      { id: "medium", label: "Mediano" },
                      { id: "large", label: "Grande" }
                    ].map((item) => {
                      const isSelected = value === item.id;
                      return (
                        <TouchableOpacity
                          key={item.id}
                          activeOpacity={0.9}
                          onPress={() => onChange(item.id)}
                          className={`flex-1 py-3.5 rounded-full border items-center justify-center ${
                            isSelected ? "bg-secondary border-transparent" : "bg-surface border-border"
                          }`}
                        >
                          <Text
                            className={`text-[12px] font-plus-jakarta-bold ${
                              isSelected ? "text-surface" : "text-on-surface-secondary"
                            }`}
                          >
                            {item.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              />
            </View>

            {/* Address Input with pin icon */}
            <Controller
              control={control}
              name="address"
              render={({ field: { value, onChange, onBlur } }) => (
                <View className="relative">
                  <Input
                    label="Última ubicación vista *"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Calle, Barrio o Ciudad"
                    error={errors.address?.message}
                  />
                  <TouchableOpacity 
                    className="absolute right-4 bottom-3 w-8 h-8 bg-primary/10 rounded-full items-center justify-center border border-primary/20"
                    onPress={() => {
                      setValue("address", "Palermo, Buenos Aires");
                      Alert.alert("Ubicación Actual", "Se ha detectado tu ubicación actual por GPS.");
                    }}
                  >
                    <Ionicons name="pin" size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
              )}
            />

            {/* Date and Time Bento grid */}
            <View className="bg-primary-pale/30 rounded-2xl p-4 border border-primary/10 gap-3">
              <View className="flex-row items-center gap-2 mb-1">
                <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
                <Text className="text-[14px] font-plus-jakarta-bold text-on-surface">
                  Fecha y Hora del Suceso
                </Text>
              </View>

              <View className="flex-row gap-3">
                {/* Date Input */}
                <View className="flex-1">
                  <Controller
                    control={control}
                    name="date"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        label="Fecha"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="DD/MM/AAAA"
                        error={errors.date?.message}
                      />
                    )}
                  />
                </View>

                {/* Time Input */}
                <View className="flex-1">
                  <Controller
                    control={control}
                    name="time"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        label="Hora"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="HH:MM AM/PM"
                        error={errors.time?.message}
                      />
                    )}
                  />
                </View>
              </View>
            </View>

            {/* Description Textarea */}
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  label="Detalles adicionales"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Describe collares, marcas distintivas, comportamiento o cualquier detalle que ayude a su identificación..."
                  error={errors.description?.message}
                  multiline
                  numberOfLines={4}
                  className="h-28 py-3"
                />
              )}
            />

            {/* Safety Warning Card */}
            <View className="bg-[#DCECC8] rounded-2xl p-5 flex-row gap-4 border border-secondary/15">
              <View className="w-10 h-10 bg-secondary/10 rounded-full items-center justify-center border border-secondary/20">
                <Ionicons name="shield-checkmark" size={20} color={COLORS.secondary} />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-plus-jakarta-bold text-[#1B3411] mb-1">
                  Tu seguridad es primero.
                </Text>
                <Text className="text-[12px] font-plus-jakarta text-[#1B3411]/90 leading-relaxed">
                  No incluyas tu dirección exacta ni números de teléfono privados. Usaremos nuestro sistema de chat seguro integrado en PawsyApp para contactarte.
                </Text>
              </View>
            </View>

            {/* Actions button list */}
            <View className="gap-3 mt-2">
              <Button
                label="Publicar Reporte"
                onPress={handleSubmit(onSubmit)}
                loading={loading}
              />
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-full h-[52px] items-center justify-center rounded-full"
              >
                <Text className="text-[14px] font-plus-jakarta-bold text-on-surface-secondary">
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
