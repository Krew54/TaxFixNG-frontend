import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Image,
  KeyboardType,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";

type ScreenProps = {
  control: any;
  rules?: any;
  label: string;
  rightIcon?: any;
  rightButton?: any;
  leftIcon?: any;
  keyboardType?: KeyboardType;
  secureTextEntry?: boolean;
  maxLength?: number;
  editable?: boolean;
  iconPress?: () => void;
  rightButtonPress?: () => void;
  placeholder?: string;
  returnKeyType?: any;
  autoFocus?: boolean;
  sref?: any;
  onSubmitEditing?: any;
  autoCapitalize?: "none" | "characters" | "sentences" | "words";
  onBlur?: any;
  onFocus?: any;
};

export const Input = ({
  rightIcon,
  leftIcon,
  keyboardType,
  secureTextEntry,
  maxLength,
  editable = true,
  iconPress,
  placeholder,
  returnKeyType,
  label,
  rules,
  control,
  sref,
  onSubmitEditing,
  rightButton,
  autoFocus,
  rightButtonPress,
  onBlur,
  onFocus,
  ...others
}: ScreenProps) => {
  const [inputFocus, setInputFocus] = useState(false);
  const { colors } = useTheme();
  return (
    <Controller
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: colors.inputBox,
                borderColor: inputFocus
                  ? colors.primary
                  : error
                  ? colors.secondary
                  : colors.inputBox,
                opacity: editable ? 1 : 0.6,
              },
            ]}
          >
            {leftIcon && (
              <View style={styles.iconBtn}>
                <Image source={leftIcon} style={styles.iconStyle} />
              </View>
            )}

            <TextInput
              maxLength={maxLength && maxLength}
              secureTextEntry={secureTextEntry}
              style={[
                styles.inputStyle,
                {
                  color: colors.text,
                  backgroundColor: colors.inputBox,
                },
              ]}
              selectionColor={colors.body}
              cursorColor={colors.primary}
              editable={editable}
              keyboardType={keyboardType}
              placeholder={placeholder}
              onChangeText={onChange}
              autoFocus={autoFocus}
              value={
                keyboardType === "numeric"
                  ? value
                      ?.replace(".", "")
                      ?.replace(",", "")
                      ?.replace("-", "")
                      ?.replace(" ", "")
                  : keyboardType === "email-address"
                  ? value?.trim()
                  : value
              }
              onFocus={() => {
                setInputFocus(true);
                onFocus && onFocus();
              }}
              onBlur={() => {
                setInputFocus(false);
                onBlur && onBlur();
              }}
              returnKeyType={returnKeyType}
              placeholderTextColor={colors.body}
              ref={sref}
              onSubmitEditing={onSubmitEditing}
              textContentType={secureTextEntry ? "oneTimeCode" : "none"}
              {...others}
            />

            {rightButton && (
              <Pressable style={styles.iconBtn} onPress={rightButtonPress}>
                <ThemedText>{rightButton}</ThemedText>
              </Pressable>
            )}

            {rightIcon && (
              <Pressable style={styles.iconBtn} onPress={iconPress}>
                <Image
                  source={rightIcon}
                  style={styles.iconStyle}
                  tintColor={colors.text}
                />
              </Pressable>
            )}
          </View>
          {error && (
            <View style={{ marginBottom: globalStyles.margin.xs - 4 }}>
              <ThemedText
                style={{
                  color: colors.red,
                }}
              >
                {error?.message}
              </ThemedText>
            </View>
          )}
        </>
      )}
      name={label}
      control={control}
      rules={rules}
    />
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: globalStyles.radius.xs - 4,
    paddingRight: globalStyles.padding.sm,
    marginTop: globalStyles.margin.sm,
    height: 56,
    paddingHorizontal: globalStyles.padding.sm,
    borderWidth: 1,
  },
  inputStyle: {
    flex: 1,
    borderRadius: globalStyles.radius.sm,
    fontFamily: "Inter-Regular",
  },

  iconBtn: {
    borderRadius: 50,
    padding: globalStyles.padding.xs,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },
});
