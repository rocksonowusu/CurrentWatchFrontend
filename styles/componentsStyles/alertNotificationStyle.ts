import { StyleSheet } from "react-native";
export const alertNotificationStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        paddingHorizontal: 16,
        paddingTop: 8,
      },
      alertContainer: {
        marginBottom: 8,
        borderRadius: 12,
        overflow: 'hidden',
        marginHorizontal:10
      },
      alertContent: {
        padding: 16,
      },
      alertHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
      iconContainer: {
        marginRight: 12,
        marginTop: 2,
      },
      alertTextContainer: {
        flex: 1,
      },
      alertTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
      },
      alertMessage: {
        fontSize: 14,
        lineHeight: 20,
      },
      closeButton: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
      },
})