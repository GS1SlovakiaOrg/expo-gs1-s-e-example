import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const styles = StyleSheet.create({
  alignSelfEnd: {
    alignSelf: 'flex-end'
  },
  backgroundWhite: {
    backgroundColor: "#fff"
  },
  backgroundOrange09: {
    backgroundColor: Colors.gs1OrangeColorRgba09
  },
  backgroundSuccess02: {
    backgroundColor: Colors.successColor02
  },
  borderBottom: {
    borderBottomColor: Colors.gs1OrangeColorRgba03,
    borderBottomWidth: 2,
    // borderBottomStyle: 'solid',
  },
  bottomRoundButton: {
    alignSelf: "flex-end",
    borderRadius: 50
  },
  btnNotPressed: {
    borderColor: Colors.gs1OrangeColorRgb,
    color: Colors.gs1OrangeColorRgb,
    backgroundColor: "#fff"
  },
  btnPressed: {
    borderColor: "#fff",
    color: "#fff",
    backgroundColor: Colors.gs1OrangeColorRgb
  },
  centerHorizontally: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  containerBase: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  containerAbsoluteBR: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  containerRounded: {
    borderRadius: 50
  },
  containerMain: {
    flex: 1,
    alignItems: "stretch",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  containerCenterHorizontally: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  containerCenterAll: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  fontSize11: {
    fontSize: 11,
  },
  fontSize16: {
    fontSize: 16,
  },
  fontSize18: {
    fontSize: 18,
  },
  fontSize20: {
    fontSize: 20,
  },
  fontSize22: {
    fontSize: 22,
  },
  fontWeightBold: {
    fontWeight: "bold",
  },
  h1: {
    fontSize: 22,
    color: Colors.gs1BlueColorRgb,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 14,
  },
  h2: {
    fontSize: 20,
    color: Colors.gs1BlueColorRgb,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 12,
  },
  h3: {
    fontSize: 18,
    color: Colors.gs1BlueColorRgb,
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 10,
  },
  h4: {
    fontSize: 16,
    color: Colors.gs1BlueColorRgb,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 8,
  },
  mb1: {
    marginBottom: 6
  },
  mb2: {
    marginBottom: 12
  },
  mb3: {
    marginBottom: 18
  },
  mb4: {
    marginBottom: 28
  },
  mb5: {
    marginBottom: 40
  },
  me1: {
    marginEnd: 6
  },
  me2: {
    marginEnd: 12
  },
  me3: {
    marginEnd: 18
  },
  mt1: {
    marginTop: 6
  },
  mt2: {
    marginTop: 12
  },
  mt3: {
    marginTop: 18
  },
  mt4: {
    marginTop: 28
  },
  mx1: {
    marginHorizontal: 6
  },
  mx2: {
    marginHorizontal: 12
  },
  my1: {
    marginVertical: 6
  },
  my2: {
    marginVertical: 12
  },
  my3: {
    marginVertical: 18
  },
  pb1: {
    paddingBottom: 6
  },
  pb2: {
    paddingBottom: 12
  },
  pb3: {
    paddingBottom: 18
  },
  pb4: {
    paddingBottom: 28
  },
  pb5: {
    paddingBottom: 40
  },
  pe1: {
    paddingEnd: 6
  },
  pe2: {
    paddingEnd: 12
  },
  pe3: {
    paddingEnd: 18
  },
  pe4: {
    paddingEnd: 28
  },
  ps1: {
    paddingStart: 6
  },
  ps2: {
    paddingStart: 12
  },
  pt1: {
    paddingTop: 6
  },
  pt2: {
    paddingTop: 12
  },
  pt3: {
    paddingTop: 18
  },
  pt4: {
    paddingTop: 28
  },
  pt5: {
    paddingTop: 40
  },
  px1: {
    paddingHorizontal: 6
  },
  px2: {
    paddingHorizontal: 12
  },
  px3: {
    paddingHorizontal: 18
  },
  px4: {
    paddingHorizontal: 28
  },
  py1: {
    paddingVertical: 6
  },
  py2: {
    paddingVertical: 12
  },
  py3: {
    paddingVertical: 18
  },
  py4: {
    paddingVertical: 28
  },
  roundedBorderBtn: {
    alignSelf: 'flex-end',
    borderWidth: 2,
    borderRadius: 50
  },
  selectedText: {
    color: Colors.gs1OrangeColorRgb,
    fontWeight: 'bold',
  },
  text: {
    color: Colors.greyedTabRgb,
    fontSize: 14
  },
  textCenter: {
    textAlign: "center",
  },
  textJustify: {
    textAlign: "justify",
  },
  textDanger: {
    color: Colors.dangerColor,
  },
  textWarning: {
    color: Colors.warningColor,
  },
  textGs1Blue: {
    color: Colors.gs1BlueColorRgb,
  },
  textGs1Theme: {
    color: Colors.gs1OrangeColorRgb,
  },
  textGs1Orange: {
    color: Colors.gs1OrangeColorRgb,
  },
  textNormal: {
    color: Colors.greyedTabRgb,
  },
  textSuccess: {
    color: Colors.successColor,
  },
  textWhite: {
    color: "#fff",
  },
  textWrap: {
    flex: 1,
    flexWrap: "wrap",
  }
});
