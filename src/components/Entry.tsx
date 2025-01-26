import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  entry: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 8,
  },
  entryTop: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 4,
    "@media min-width: 672": {
      flexDirection: "row",
    },
  },
  entryMain: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  header: {
    fontWeight: "bold",
    fontSize: 12,
  },
  subtitle: {
    fontSize: 10,
  },
  date: {
    fontSize: 10,
  },
  description: {
    fontSize: 10,
  },
});

export function Entry({
  header,
  subtitle,
  date,
  description,
}: {
  header: string;
  subtitle: string;
  date: string;
  description?: string;
}) {
  return (
    <View style={styles.entry}>
      <View style={styles.entryTop}>
        <View style={styles.entryMain}>
          <Text style={styles.header}>{header}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}
