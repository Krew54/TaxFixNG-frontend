import { useTheme } from "@/hooks/use-theme-color";
import { formatWithCommas, globalStyles } from "@/utils";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Image,
  KeyboardType,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";

type Option = {
  label: string;
  value: string;
};

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

  /** Select specific */
  type?: "text" | "select";
  options?: Option[];
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
  type = "text",
  options = [],
  ...others
}: ScreenProps) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { colors } = useTheme();

  return (
    <Controller
      name={inputName}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          {showLabel && (
            <ThemedText style={{ marginTop: globalStyles.margin.sm }}>
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

            {/* TEXT INPUT */}
            {type === "text" ? (
              <TextInput
                maxLength={maxLength}
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
                  onFocus?.();
                }}
                onBlur={() => {
                  setInputFocus(false);
                  onBlur?.();
                }}
                returnKeyType={returnKeyType}
                placeholderTextColor={colors.body}
                ref={sref}
                onSubmitEditing={onSubmitEditing}
                textContentType={secureTextEntry ? "oneTimeCode" : "none"}
                {...others}
              />
            ) : (
              /* SELECT INPUT */
              <Pressable
                style={styles.inputStyle}
                onPress={() => {
                  setInputFocus(true);
                  setShowOptions(true);
                }}
              >
                <ThemedText
                  style={{
                    color: value ? colors.text : colors.body,
                  }}
                >
                  {options.find((o) => o.value === value)?.label ||
                    placeholder ||
                    "Select option"}
                </ThemedText>
              </Pressable>
            )}

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

          {/* SELECT MODAL */}
          {type === "select" && (
            <Modal
              transparent
              animationType="fade"
              visible={showOptions}
              onRequestClose={() => setShowOptions(false)}
              statusBarTranslucent
            >
              <Pressable
                style={styles.modalOverlay}
                onPress={() => setShowOptions(false)}
              >
                <View
                  style={[
                    styles.modalContent,
                    { backgroundColor: colors.inputBox },
                  ]}
                >
                  {options.map((item) => (
                    <Pressable
                      key={item.value}
                      style={styles.option}
                      onPress={() => {
                        onChange(item.value);
                        setShowOptions(false);
                        setInputFocus(false);
                      }}
                    >
                      <ThemedText>{item.label}</ThemedText>
                    </Pressable>
                  ))}
                </View>
              </Pressable>
            </Modal>
          )}

          {error && (
            <View style={{ marginBottom: globalStyles.margin.xs - 4 }}>
              <ThemedText style={{ color: colors.red }}>
                {error.message}
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
    justifyContent: "center",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    borderRadius: 12,
    paddingVertical: 8,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
