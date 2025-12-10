import { Button, ScreenHeader, ScreenWrapper } from "@/components/common";
import { DigitInput } from "@/components/digit-input";
import { ThemedText } from "@/components/themed-text";
import { storeData } from "@/helpers";
import { useLogin, useVerifyEmail } from "@/hooks/auth";
import { globalStyles, showToast } from "@/utils";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

let pin: any;

export default function Index() {
  const { email, query, password } = useLocalSearchParams();

  const ref1 = useRef<TextInput>(null);
  const ref2 = useRef<TextInput>(null);
  const ref3 = useRef<TextInput>(null);
  const ref4 = useRef<TextInput>(null);
  const ref5 = useRef<TextInput>(null);
  const ref6 = useRef<TextInput>(null);

  const [digit1, setDigit1] = useState<number>();
  const [digit2, setDigit2] = useState<number>();
  const [digit3, setDigit3] = useState<number>();
  const [digit4, setDigit4] = useState<number>();
  const [digit5, setDigit5] = useState<number>();
  const [digit6, setDigit6] = useState<number>();

  const [buttonActive, setButtonActive] = useState(false);

  const [timerCount, setTimer] = useState(60);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (digit1 && digit2 && digit3 && digit4 && digit5 && digit6) {
      pin = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;

      Keyboard.dismiss();
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [digit1, digit2, digit3, digit4, digit5, digit6]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      ref1.current?.focus();
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  const { isPending: isSubmitting, mutate: Login } = useLogin((res) => {
    if (res.status >= 400) {
      let message = "";
      if (Array.isArray(res.data.detail)) {
        const msgs = res.data.detail.map((err: any) => err.msg);

        // Remove duplicates
        const uniqueMsgs = [...new Set(msgs)];

        message = uniqueMsgs.join(", ");
      } else {
        message = res.data.detail;
      }
      showToast({
        label: "Error",
        message,
        type: "error",
      });
    } else {
      storeData("token", res.data.access_token);
      router.replace("/(tabs)");
    }
  });

  const { isPending, mutate } = useVerifyEmail((res) => {
    if (res.status >= 400) {
      showToast({
        label: "Error",
        message: res.data.message,
        type: "error",
      });
    } else {
      showToast({
        label: "Sucess",
        message: res.data.message,
        type: "success",
      });
      if (query === "new-password") {
        router.push("/new-password");
      } else if (query === "login") {
        const payload = {
          username: email?.toString().toLowerCase(),
          password: password,
        };
        Login({
          payload,
        });
      } else {
        router.push("/");
      }
    }
  });
  const handleSubmit = async () => {
    mutate({
      payload: {
        email: email,
        code: pin,
      },
    });
    // router.push("/new-password");
  };
  return (
    <ScreenWrapper>
      <ScreenHeader />

      <View style={styles.mainWrapper}>
        <ScrollView>
          <View style={styles.headerWrapper}>
            <ThemedText type="defaultSemiBold">OTP Verification</ThemedText>
          </View>
          <ThemedText>
            Enter the 6 digit code we sent to your email address
          </ThemedText>

          <View style={styles.inputWrapper}>
            <DigitInput
              sref={ref1}
              value={digit1}
              onChangeText={(value: any) => {
                // @ts-ignore
                value ? ref2.current.focus() : ref1.current.focus();
                setDigit1(value);
              }}
              //   autoFocus
            />

            <DigitInput
              sref={ref2}
              value={digit2}
              onChangeText={(value: any) => {
                // @ts-ignore
                value ? ref3.current.focus() : ref1.current.focus();
                setDigit2(value);
              }}
            />

            <DigitInput
              sref={ref3}
              value={digit3}
              onChangeText={(value: any) => {
                // @ts-ignore
                value ? ref4.current.focus() : ref2.current.focus();
                setDigit3(value);
              }}
            />

            <DigitInput
              sref={ref4}
              value={digit4}
              onChangeText={(value: any) => {
                // @ts-ignore
                value ? ref5.current.focus() : ref3.current.focus();
                setDigit4(value);
              }}
            />

            <DigitInput
              sref={ref5}
              value={digit5}
              onChangeText={(value: any) => {
                // @ts-ignore
                value ? ref6.current.focus() : ref4.current.focus();
                setDigit5(value);
              }}
            />

            <DigitInput
              sref={ref6}
              value={digit6}
              onChangeText={(value: any) => {
                // @ts-ignore
                value ? ref6.current.focus() : ref5.current.focus();
                setDigit6(value);
              }}
            />
          </View>

          {/* <View style={styles.resendWrapper}>
            <ThemedText>I don't receive a code! </ThemedText>

            {timerCount < 1 ? (
              <TouchableOpacity activeOpacity={0.6} onPress={resendOtp}>
                <ThemedText>Please resend</ThemedText>
              </TouchableOpacity>
            ) : (
              <ThemedText>{timerCount}</ThemedText>
            )}
          </View> */}
        </ScrollView>
        <View style={styles.buttonWrapper}>
          <Button
            label="Continue"
            onPress={handleSubmit}
            active={buttonActive}
            loading={isPending || isSubmitting}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    paddingHorizontal: globalStyles.wrapper,
  },
  headerWrapper: {
    marginTop: globalStyles.margin.lg,
    marginBottom: globalStyles.margin.xs,
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: globalStyles.margin.xl,
  },
  resendWrapper: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: globalStyles.margin.md,
  },
  buttonWrapper: {
    marginTop: globalStyles.margin.md,
  },
});
