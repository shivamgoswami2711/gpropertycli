import { Link } from "expo-router";
import {Image, StyleSheet, Text, View } from "react-native";
import logo from "../assets/logo.png";

const {
  DrawerContentScrollView,
} = require("@react-navigation/drawer");

export function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.title}>Gproperty</Text>
      </View>
      <View style={styles.containerView}>
        <Link href="/" onPress={() => props.navigation.closeDrawer()}>
          <View style={styles.drawerItem}>
            <Text style={styles.drawerLabel}>Home</Text>
          </View>
        </Link>
        <Link href="/buy" onPress={() => props.navigation.closeDrawer()}>
          <View style={styles.drawerItem}>
            <Text style={styles.drawerLabel}>Buy</Text>
          </View>
        </Link>
        <Link href="/rent" onPress={() => props.navigation.closeDrawer()}>
          <View style={styles.drawerItem}>
            <Text style={styles.drawerLabel}>Rent</Text>
          </View>
        </Link>
        <Link href="/sell" onPress={() => props.navigation.closeDrawer()}>
          <View style={styles.drawerItem}>
            <Text style={styles.drawerLabel}>Sell</Text>
          </View>
        </Link>
        <Link href="/login" onPress={() => props.navigation.closeDrawer()}>
          <View style={styles.drawerItem}>
            <Text style={styles.drawerLabel}>Login</Text>
          </View>
        </Link>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  containerView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  drawerItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 14,
    paddingHorizontal: 10,
    width: 200,
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
