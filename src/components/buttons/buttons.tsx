import Colors from "@/styles/Colors";
import { styles } from "@/styles/styles";
import AntDesign from "@react-native-vector-icons/ant-design/static";
import { Pressable } from "react-native";

interface roundIconBtnProps {
  iconName: React.ComponentProps<typeof AntDesign>['name']
  iconSize: number
  doOnClick: () => void
}
export function RoundIconButton(props: roundIconBtnProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        (pressed) ? styles.btnPressed : styles.btnNotPressed,
        styles.px3, styles.py3, styles.roundedBorderBtn
      ]}

      onPress={() => {
        props.doOnClick()
      }}>

      {({ pressed }) => (
        <AntDesign name={props.iconName} size={props.iconSize} color={pressed ? '#fff' : Colors.gs1OrangeColorRgb} />
      )}
    </Pressable>
  )
}
interface CameraBtnProps {
  doOnClick: () => void
}
export function CameraBtn(props: CameraBtnProps) {
  return <RoundIconButton
    iconName={'scan'}
    iconSize={30}
    doOnClick={props.doOnClick}
  />
}
