import React, { useEffect, useState } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config/firebaseConfig";
import { useStore } from "../App";

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

const { width, height } = Dimensions.get("window");

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);


  const signUpFunction = async () => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    const userData = {
      email: email,
      password: password,
    };

    try {


      if (email === "" || password === "" || rePassword === "") {
        alert("Please fill all the fields");
        //navigation.navigate("Signup");
      } else {
        if (emailRegex.test(email) === false) {
          alert("Please enter a valid email address");
        } else if (password.length < 8 || rePassword.length < 8) {
          alert("Password and Repassword must be at least 8 characters long");
        } else if (password != rePassword) {
          alert("Confirm Password does not match, Enter Again");
        } else if (password === rePassword) {
          createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
              const user = userCredential.user;
              const userID = user.uid;
              // Signed up
              console.log(user);
              const res = await axios.post(
                "http://192.168.236.242:5000/api/signInServer/SignUp",
                { ...userData, uid: user.uid },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const data = await res.data;
              if (data.exists) {
                alert("User already exists, Try with another email address");
              } else {
                console.log("Response from server:", res.data.message);
                navigation.replace("Gender");
              }
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
        }
      }
    } catch (error) {
      console.log("Error occure in SignIn:", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.greetingTitle}>Hello there</Text>
          <Text style={styles.headTitle}>Create an Account</Text>
        </View>
        <View style={styles.inputTxt}>
          <Text style={styles.textTitles}>Enter your Email</Text>
          <TextInput
            placeholder="Email@gmail.com"
            placeholderTextColor={"#7166e4"}
            value={email}
            keyboardType="email-address"
            onChangeText={(email) => setEmail(email)}
            style={styles.inputArea}
          />
          <Text style={styles.textTitles}>Enter your Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="* * * * * * * *"
              placeholderTextColor={"#7166e4"}
              value={password}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={!showPassword}
              style={styles.passwordInputArea}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.toggleIcon}>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textTitles}>Re-Enter your Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="* * * * * * * *"
              placeholderTextColor={"#7166e4"}
              value={rePassword}
              onChangeText={(rePassword) => setRePassword(rePassword)}
              secureTextEntry={!showRePassword}
              style={styles.passwordInputArea}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setShowRePassword(!showRePassword)}
            >
              <Text style={styles.toggleIcon}>{showRePassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnLayout}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={signUpFunction}
          >
            <Text style={styles.createText}>Create account</Text>
          </TouchableOpacity>
          <View
            style={{
              alignSelf: "center",
              borderBottomWidth: 2.5,
              borderBottomColor: "rgb(217,217,217)",
              width: "100%",
            }}
          />
          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleText}>Create account with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.alreadyMadeBtn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.alreadyMadeText}>
              Already have an account?{" "}
              <Text style={{ color: "#7166e4", fontWeight: "bold" }}>
                Login
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#336699',
    padding: 20,
  },

  header: {
    paddingTop: height * 0.05,
    width: '100%',
    alignItems: "center",
  },
  greetingTitle: {
    color: "white",
    paddingBottom: 1,
    fontSize: width * 0.08,
  },
  headTitle: {
    color: "white",
    paddingBottom: 50,
    fontSize: width * 0.1,
    fontWeight: "bold",
  },
  inputTxt: {
    marginTop: height * 0.04,
  },
  textTitles: {
    marginTop: 10,
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginLeft: width * 0.05,
    marginBottom: width * 0.02,
    color: "white",
  },
  inputArea: {
    alignSelf: "center",
    backgroundColor: "white",
    padding: width * 0.03,
    borderRadius: 10,
    width: width * 0.9,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.9,
    alignSelf: "center",
  },
  passwordToggle: {
    position: "absolute",
    right: width * 0.04,
  },
  passwordInputArea: {
    alignSelf: "center",
    backgroundColor: "white",
    padding: width * 0.04,
    marginTop: height * 0.01,
    borderRadius: 10,
    width: "100%",
  },
  toggleIcon: {
    color: '#7166e4',
    fontSize: width * 0.04,
  },
  btnLayout: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: height * 0.02,
    width: "90%",
    alignSelf: "center",
  },
  createButton: {
    alignSelf: "center",
    padding: width * 0.04,
    backgroundColor: "#7166e4",
    marginVertical: 30,
    marginHorizontal: 10,
    width: "100%",
    borderRadius: 10,
  },
  createText: {
    color: "#ffffff",
    fontSize: width * 0.05,
    textAlign: "center",
  },
  googleButton: {
    alignSelf: "center",
    padding: width * 0.04,
    backgroundColor: "#7166e4",
    marginVertical: height * 0.02,
    width: "100%",
    borderRadius: 10,
  },
  googleText: {
    color: "#ffffff",
    fontSize: width * 0.05,
    textAlign: 'center',
  },
  alreadyMadeBtn: {
    padding: width * 0.02,
  },
  alreadyMadeText: {
    color: "#ffffff",
    fontSize: width * 0.04,
    textAlign: "center",
  },
});

export default SignUp;
