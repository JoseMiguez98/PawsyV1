import React from "react";
import { Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PetDetails } from "../../features/reports/components/pet-details.component";
import { BadgeType } from "../../features/common/components/badge.component";

interface ReportDetail {
  id: string;
  name: string;
  type: "lost" | "found" | "adoption";
  badgeType: BadgeType;
  image: any;
  breed: string;
  color: string;
  size: string;
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
}

const DETAILS_MOCK: Record<string, ReportDetail> = {
  "1": {
    id: "1",
    name: "Cachorro triste en el parque",
    type: "found",
    badgeType: "avistado",
    image: require("../../assets/images/found_cat.png"),
    breed: "Cachorro mestizo",
    color: "Café / Negro",
    size: "Pequeño",
    location: "Parque Central, Zona 10",
    time: "Hace 2 horas",
    description: "Es un cachorro pequeño, color café, parece asustado y busca comida. Se asusta al intentar cargarlo pero responde bien al alimento. Lleva un collar de tela simple pero no tiene chapa de identificación.",
    tags: ["Asustado", "Nivel de energía: Bajo", "Requiere cuidado"],
    reporter: {
      name: "Martín Rodríguez",
      phone: "+54 9 11 5555-5555",
      role: "Vecino colaborador"
    },
  },
  "2": {
    id: "2",
    name: "Gata \"Minina\"",
    type: "lost",
    badgeType: "perdido",
    image: require("../../assets/images/lost_dog.png"),
    breed: "Siamesa de ojos azules",
    color: "Blanco / Crema y negro",
    size: "Pequeña",
    location: "Residenciales El Sol",
    time: "Hace 5 horas",
    description: "Tiene un collar rosa con cascabel. Responde a su nombre 'Minina'. Se escapó de su transportadora al llegar de la veterinaria. Si la veis, por favor no hagáis ruidos fuertes ya que es muy tímida.",
    tags: ["Tímida", "Ruidosa cascabel", "Perdida"],
    reporter: {
      name: "Juan Delgadillo",
      phone: "+54 9 11 4444-4444",
      role: "Dueño"
    },
  },
  "3": {
    id: "3",
    name: "Puppi",
    type: "adoption",
    badgeType: "adoptable",
    image: require("../../assets/images/adoptable_puppy.png"),
    breed: "Cocker Spaniel",
    color: "Canela / Blanco",
    size: "Mediana (2 años)",
    location: "Refugio La Helena",
    time: "Activo",
    description: "Tiene 2 años, vacunada, muy dulce y juguetona con niños. Se lleva de maravillas con otros perros y le encanta correr. Busca un hogar definitivo.",
    tags: ["Amigable", "Nivel de energía: Alto", "Sociable con niños"],
    reporter: {
      name: "Refugio La Helena",
      phone: "+54 9 11 3333-3333",
      role: "Gestora de Adopciones"
    },
  },
};

export default function ReportDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const report = DETAILS_MOCK[id || "1"] || DETAILS_MOCK["1"];

  const handleContact = () => {
    Alert.alert(
      "Contactar Reportante",
      `¿Deseas enviar un mensaje seguro a ${report.reporter.name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => {
          Alert.alert("Éxito", "Mensaje enviado a través de la red segura de PawsyApp.");
        }},
      ]
    );
  };

  return (
    <PetDetails
      id={report.id}
      name={report.name}
      type={report.type}
      badgeType={report.badgeType}
      image={report.image}
      breed={report.breed}
      color={report.color}
      size={report.size}
      location={report.location}
      time={report.time}
      description={report.description}
      tags={report.tags}
      reporter={report.reporter}
      onBack={() => router.back()}
      onContact={handleContact}
    />
  );
}
