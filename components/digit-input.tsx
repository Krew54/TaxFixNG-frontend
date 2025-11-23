import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

type Props = {
  sref: any;
  value: any;
  onChangeText: any;
  autoFocus?: boolean;
  isError?: boolean;
};
export const DigitInput = ({
  sref,
  value,
  onChangeText,
  autoFocus,
  isError,
}: Props) => {
  const [inputFocus, setInputFocus] = useState(false);
  const { colors } = useTheme();

  return (
    <TextInput
      style={[
        styles.inputStyle,
        {
          borderColor: inputFocus
            ? colors.primary
            : isError
            ? colors.secondary
            : colors.inputBox,
          backgroundColor: colors.inputBox,
          color: colors.text,
        },
      ]}
      maxLength={1}
      keyboardType="number-pad"
      selectionColor={colors.body}
      ref={sref}
      value={value}
      onChangeText={onChangeText}
      onFocus={() => setInputFocus(true)}
      onBlur={() => {
        setInputFocus(false);
      }}
      autoFocus={autoFocus}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 49,
    width: 49,
    textAlign: "center",
    fontFamily: "Inter-Bold",
    borderWidth: 0.5,
    borderRadius: globalStyles.radius.xs,
  },
});
