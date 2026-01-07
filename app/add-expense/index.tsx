import {
  Button,
  Input,
  ScreenHeader,
  ScreenWrapper,
} from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useCreateExpense } from "@/hooks/expenses";
import { useTheme } from "@/hooks/use-theme-color";
import { checkAuth, EXPENSE_TYPES, globalStyles, showToast } from "@/utils";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type InputTypes = {
  category: string;
  document_name: string;
  amount: string;
  relevant_tax_year: string;
  file: string;
  documentName: string; // store the file name
};

export default function Index() {
  const { colors } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const { control, watch, handleSubmit, formState, setValue, register } =
    useForm<InputTypes>({
      mode: "onChange",
    });

  useEffect(() => {
    setValue("relevant_tax_year", "2026");
    register("file", {
      // required: "Supporting document is required",
    });
    register("documentName"); // optional
  }, []);

  /* -------------------- Upload handlers -------------------- */
  const setDocument = (uri: string, name: string) => {
    setValue("file", uri, { shouldValidate: true });
    setValue("documentName", name);
    setShowModal(false);
  };

  const handleScanCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const name = uri.split("/").pop() || "camera_image.jpg";
      setDocument(uri, name);
    }
  };

  const handleUploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const name = uri.split("/").pop() || "image.jpg";
      setDocument(uri, name);
    }
  };

  const handleUploadFile = async () => {
    const result: any = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });
    if (result.assets?.length) {
      const uri = result.assets[0].uri;
      const name = result.assets[0].name || "document.pdf";
      setDocument(uri, name);
    } else if (result.uri) {
      // fallback for single file picker
      const uri = result.uri;
      const name = result.name || "document.pdf";
      setDocument(uri, name);
    }
  };

  const handleRemoveDocument = () => {
    setValue("file", "");
    setValue("documentName", "");
  };

  const { isPending, mutate } = useCreateExpense((response) => {
    if (response.status >= 400) {
      console.log(response.data);

      // showToast({
      //   label: "Error",
      //   message: response.data.detail,
      //   type: "error",
      // });
    } else {
      showToast({
        label: "Success",
        message: "Expense added successfully",
        type: "success",
      });
      router.back();
    }
  });

  /* -------------------- Submit -------------------- */
  const onSubmit: SubmitHandler<InputTypes> = async (data) => {
    const isLoggedIn = await checkAuth();
    if (!isLoggedIn) return;

    const formData = new FormData();

    // Add regular fields
    formData.append("category", data.category);
    formData.append("document_name", data.document_name);
    formData.append("amount", data.amount);
    formData.append("relevant_tax_year", data.relevant_tax_year);

    // Add the document if it exists
    if (data.file) {
      const uriParts = data.file.split("/");
      const fileName = uriParts[uriParts.length - 1];
      const fileType = fileName.split(".").pop(); // e.g., "jpg", "pdf"

      formData.append("file", {
        uri: data.file,
        name: fileName,
        type: fileType === "pdf" ? "application/pdf" : `image/${fileType}`,
      } as any); // cast as any for RN FormData
    }

    mutate({
      payload: formData as any,
    });
  };

  const documentName = watch("documentName");

  return (
    <ScreenWrapper>
      <ScreenHeader title="Add Tax Record" />
      <ScrollView>
        <ThemedView style={styles.mainWrapper}>
          <ThemedText style={{ marginBottom: globalStyles.margin.lg }}>
            Save tax-relevant records and supporting documents for the 2026 tax
            year in one secure place.
          </ThemedText>

          {/* Expense Type */}
          <Input
            control={control}
            inputName="category"
            label="Record Type"
            placeholder="Select Record type"
            showLabel
            type="select"
            rules={{ required: "Record type is required" }}
            options={EXPENSE_TYPES}
          />

          {/* Expense Name */}
          <Input
            control={control}
            label="Record Name"
            inputName="document_name"
            placeholder="Record name"
            rules={{ required: "Record name is required" }}
            showLabel
          />

          {/* Amount */}
          <Input
            control={control}
            inputName="amount"
            label="Amount"
            placeholder="Amount"
            keyboardType="numeric"
            formatNumber
            showLabel
            rules={{ required: "Amount is required" }}
          />

          {/* Upload Document Button */}
          <Pressable
            style={[styles.uploadDocumentBtn, { borderColor: colors.body }]}
            onPress={() => setShowModal(true)}
          >
            <View style={styles.plusIcon}>
              <ThemedText type="title" style={{ color: colors.primary }}>
                +
              </ThemedText>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <ThemedText type="defaultSemiBold">Add Document</ThemedText>
              <ThemedText style={{ marginTop: globalStyles.margin.xs - 4 }}>
                Upload receipt or proof (PDF, JPG, PNG)
              </ThemedText>
            </View>
          </Pressable>

          {/* Attached Document Info */}
          {documentName ? (
            <View style={styles.documentInfo}>
              <ThemedText style={{ flex: 1 }}>{documentName}</ThemedText>
              <Pressable onPress={handleRemoveDocument}>
                <ThemedText
                  type="defaultSemiBold"
                  style={{ color: colors.red }}
                >
                  Remove
                </ThemedText>
              </Pressable>
            </View>
          ) : null}

          {formState.errors.file && (
            <ThemedText style={{ color: colors.red }}>
              {formState.errors.file.message}
            </ThemedText>
          )}

          {/* Submit */}
          <Button
            label="Save Expense"
            onPress={handleSubmit(onSubmit)}
            active={formState.isValid}
            style={styles.btnStyle}
            loading={isPending}
          />
        </ThemedView>
      </ScrollView>

      {/* Bottom Sheet Modal */}
      <Modal
        transparent
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
        statusBarTranslucent
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowModal(false)}
        >
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.background },
            ]}
          >
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleScanCamera}
            >
              <View style={styles.iconWrapper}>
                <Image
                  source={require("../../assets/icons/camera.png")}
                  style={styles.iconStyle}
                  resizeMode="contain"
                />
              </View>
              <ThemedText type="defaultSemiBold">Scan with Camera</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleUploadImage}
            >
              <View style={styles.iconWrapper}>
                <Image
                  source={require("../../assets/icons/image.png")}
                  style={styles.iconStyle}
                  resizeMode="contain"
                />
              </View>
              <ThemedText type="defaultSemiBold">Upload an Image</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleUploadFile}
            >
              <View style={styles.iconWrapper}>
                <Image
                  source={require("../../assets/icons/file.png")}
                  style={styles.iconStyle}
                  resizeMode="contain"
                />
              </View>
              <ThemedText type="defaultSemiBold">Upload a File</ThemedText>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    paddingTop: globalStyles.margin.lg,
    paddingHorizontal: globalStyles.wrapper,
  },
  btnStyle: {
    marginTop: globalStyles.margin.xl,
  },
  uploadDocumentBtn: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: globalStyles.margin.md + 2,
    padding: globalStyles.padding.sm,
    borderRadius: 8,
  },
  plusIcon: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#D9D9D9",
    marginRight: globalStyles.margin.xs + 4,
  },
  documentInfo: {
    marginTop: globalStyles.margin.sm,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    padding: globalStyles.padding.md,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalOption: {
    paddingVertical: globalStyles.padding.sm,
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#f4f7f7",
    marginRight: globalStyles.margin.sm,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
