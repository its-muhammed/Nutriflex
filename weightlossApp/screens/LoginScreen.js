import React, { useState } from "react";
import axios from "axios";
import { Platform } from "react-native";
import { auth } from "./config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config/firebaseConfig";

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { useStore } from "../App";

const { width, height } = Dimensions.get("window");

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userID, setUserID] = useState(null);
  const updateCurrentUser = useStore((state) => state.updateCurrentUser);

  console.log(userID);

  const logInFunction = async () => {
    try {
      if (email === "" || password === "") {
        alert("Please fill all the fields");
      } else {
        if (password.length < 8) {
          alert("Password must be at least 8 characters long");
        } else {
          signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
              // Signed in
              const user = userCredential.user;
              const userID = user.uid;
              const docRef = doc(db, "Users", userID);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                updateCurrentUser(docSnap.data());
              } else {
                console.log("No such document!");
              }
              navigation.navigate("PlanScreen");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error("Error:", errorMessage);
              alert("An error occurred during login, please try again later");
            });
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const uid = user.uid;
          const res = await axios.post(
            "http://192.168.8.242:5000/api/logInServer/LogIn",
            { email, password, uid },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("hi1");
          // const data = await res.data;
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.greetingTitle}>Welcome back</Text>
          <Text style={styles.headTitle}>Log in</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.textTitles}>Enter your Email</Text>
            <TextInput
              placeholder="Email@gmail.com"
              placeholderTextColor="#7166e4"
              value={email}
              keyboardType="email-address"
              onChangeText={(email) => setEmail(email)}
              style={styles.inputArea}
            />
            <Text style={styles.textTitles}>Enter your Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="* * * * * * * *"
                placeholderTextColor="#7166e4"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={!showPassword}
                style={styles.passwordInputArea}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.toggleText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotTxt}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={logInFunction}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton}>
              <Text style={styles.googleText}>Sign in with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createBtn}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.createText}>
                Don't have an account?{" "}
                <Text style={{ color: "#7166e4", fontWeight: "bold" }}>
                  Create account
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#336699", // Background color for the entire screen
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay color
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  greetingTitle: {
    color: "white",
    fontSize: width * 0.08,
    marginBottom: 10,
  },
  headTitle: {
    color: "white",
    fontSize: width * 0.1,
    fontWeight: "bold",
    marginBottom: 50,
  },
  inputContainer: {
    width: width * 0.9,
    alignItems: "center",
    marginTop: 20,
  },
  textTitles: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  inputArea: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: width * 0.04,
    color: "#7166e4",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  passwordInputArea: {
    flex: 1,
    fontSize: width * 0.04,
    color: "#7166e4",
  },
  passwordToggle: {
    position: "absolute",
    right: 20,
  },
  toggleText: {
    color: "#7166e4",
    fontSize: 16,
  },
  forgotTxt: {
    color: "white",
    marginVertical: 10,
    fontSize: width * 0.04,
  },
  btnContainer: {
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#7166e4",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  loginText: {
    color: "white",
    fontSize: width * 0.05,
  },
  googleButton: {
    backgroundColor: "#7166e4",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
  },
  googleText: {
    color: "white",
    fontSize: width * 0.05,
    marginRight: 10,
  },
  createBtn: {
    marginBottom: 20,
  },
  createText: {
    color: "white",
    fontSize: width * 0.04,
  },
});

export default LogIn;