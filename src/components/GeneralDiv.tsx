import { ReactNode } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  general: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontSize: 12,
    width: 150,
  },
  entry: {
    width: "100%",
    gap: 8,
  },
});

export function GeneralDiv({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.general}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.entry}>{children}</View>
    </View>
  );
}
