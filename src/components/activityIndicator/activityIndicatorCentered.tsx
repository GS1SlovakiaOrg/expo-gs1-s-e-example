import { ActivityIndicator, Text, View } from "react-native";
import Colors from "../../styles/Colors";
import { styles } from "../../styles/styles";

type indicatorProps = {
  heading: string,
  text: string
}

export function ActivityIndicatorCentered(props: indicatorProps) {
  return (
    <View style={[styles.containerCenterAll, styles.backgroundWhite]}>
      <ActivityIndicator size="large" color={Colors.gs1BlueColorRgb} />
      <Text style={[styles.h2, styles.textCenter]}>{props.heading}</Text>
      <Text style={[styles.textCenter, styles.pt2]}>{props.text}</Text>
    </View>
  );
};
