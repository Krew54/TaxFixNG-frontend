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
  inputName: string;
  label?: string;
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
  showLabel?: boolean;
  formatNumber?: boolean;
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
  inputName,
  rules,
  control,
  sref,
  onSubmitEditing,
  rightButton,
  autoFocus,
  rightButtonPress,
  onBlur,
  onFocus,
  showLabel,
  formatNumber = false,

  ...others
}: ScreenProps) => {
  const [inputFocus, setInputFocus] = useState(false);
  const { colors } = useTheme();
  const formatWithCommas = (value: string) => {
    if (!value) return "";
    const cleaned = value.replace(/,/g, "");
    return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Controller
      name={inputName}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          {showLabel && (
            <ThemedText
              style={{
                marginTop: globalStyles.margin.sm,
              }}
            >
              {label}
            </ThemedText>
          )}
          <View
            style={[
              styles.inputWrapper,
              {
                marginTop: showLabel
                  ? globalStyles.margin.xs
                  : globalStyles.margin.sm,

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
              // onChangeText={onChange}
              onChangeText={(text) => {
                if (formatNumber) {
                  const raw = text.replace(/[^0-9]/g, "");
                  onChange(raw);
                } else {
                  onChange(text);
                }
              }}
              autoFocus={autoFocus}
              value={
                formatNumber
                  ? formatWithCommas(value)
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
    />
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: globalStyles.radius.xs - 4,
    paddingRight: globalStyles.padding.sm,
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
    paddingRight: globalStyles.padding.xs,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
