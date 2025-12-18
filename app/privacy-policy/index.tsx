import { ScreenHeader, ScreenWrapper } from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { globalStyles } from "@/utils";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <ScreenWrapper>
      <ScreenHeader title="Privacy Policy" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Section title="1. Introduction">
          This Privacy Policy explains how TaxfixNG collects, uses, stores, and
          protects your personal data in compliance with the Nigeria Data
          Protection Act (NDPA) 2023.
        </Section>

        <Section title="2. Information We Collect">
          We may collect the following categories of data:
          {"\n\n"}
          <Bold>a. Personal Information</Bold>
          {"\n"}• Full name{"\n"}• Email address{"\n"}• Phone number
          {"\n\n"}
          <Bold>b. Financial & Tax-Related Information</Bold>
          {"\n"}• Income and expense details{"\n"}• Employment or business
          information{"\n"}• Tax Identification Number (TIN){"\n"}• Uploaded
          documents such as receipts, invoices, bank statements, and expense
          records
          {"\n\n"}
          <Bold>c. Technical Information</Bold>
          {"\n"}• Device type{"\n"}• Operating system{"\n"}• App usage data
          {"\n"}• IP address (anonymized where possible)
        </Section>

        <Section title="3. How We Use Your Information">
          We use your data to:
          {"\n\n"}• Provide tax computation, filing, and compliance services
          {"\n"}• Store and organize uploaded tax documents{"\n"}• Submit
          tax-related information to relevant authorities where authorized by
          the user{"\n"}• Improve App functionality and user experience{"\n"}•
          Communicate service updates, reminders, and support messages{"\n"}•
          Comply with legal and regulatory obligations
        </Section>

        <Section title="4. Legal Basis for Processing">
          We process personal data based on:
          {"\n\n"}• User consent{"\n"}• Performance of services{"\n"}•
          Compliance with Nigerian legal obligations
        </Section>

        <Section title="5. Data Sharing and Disclosure">
          We do not sell your personal data.
          {"\n\n"}
          Data may be shared only:
          {"\n"}• With tax authorities (FIRS or SIRS) strictly for filing or
          compliance purposes and only with user authorization{"\n"}• With
          trusted service providers under strict confidentiality and data
          protection agreements{"\n"}• Where required by law or regulatory
          authorities
        </Section>

        <Section title="6. Data Retention">
          We retain personal data only for as long as necessary to fulfill the
          purposes outlined in this Policy or as required by law.
        </Section>

        <Section title="7. Data Security">
          We apply enhanced security measures appropriate for sensitive
          financial data, including:
          {"\n\n"}• Encryption of data at rest and in transit{"\n"}• Secure
          document storage and access controls{"\n"}• Periodic security reviews
          {"\n\n"}
          <ThemedText style={styles.disclaimer}>
            However, no digital platform can guarantee absolute security, and
            users acknowledge this risk.
          </ThemedText>
        </Section>

        <Section title="8. User Rights">
          Under the Nigeria Data Protection Act (NDPA), you have the right to:
          {"\n\n"}• Access your personal data{"\n"}• Request correction or
          deletion{"\n"}• Withdraw consent at any time{"\n"}• Lodge a complaint
          with the Nigeria Data Protection Commission (NDPC)
        </Section>

        <Section title="9. Children’s Privacy">
          The App is not intended for users under 18. We do not knowingly
          collect data from minors.
        </Section>

        <Section title="10. International Data Transfers">
          If data is processed outside Nigeria, we ensure adequate safeguards in
          line with NDPA requirements.
        </Section>

        <Section title="11. Automated Processing & AI Disclaimer">
          Some features rely on automated systems or AI-assisted calculations.
          Outputs are estimates and may not capture every individual
          circumstance. Users remain responsible for verifying accuracy before
          submission.
        </Section>

        <Section title="12. Updates to This Policy">
          We may update this Privacy Policy periodically. Users will be notified
          of material changes via the App.
        </Section>

        <Section title="13. Short Privacy Notice">
          TaxfixNG collects and uses your personal and tax-related data solely
          to provide tax education, computation, and filing services. Your data
          is securely stored, never sold, and shared only where necessary and
          with your consent.
        </Section>

        <Section title="14. Contact Us">
          For privacy-related inquiries:
          {"\n\n"}
          Email: taxfixng@gmail.com
        </Section>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ---------- Helper Components ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
        {title}
      </ThemedText>
      <ThemedText style={styles.sectionBody}>{children}</ThemedText>
    </View>
  );
}

function Bold({ children }: { children: React.ReactNode }) {
  return (
    <ThemedText type="defaultSemiBold" style={styles.bold}>
      {children}
    </ThemedText>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: globalStyles.wrapper,
    paddingBottom: globalStyles.margin.xxl,
    paddingTop: globalStyles.padding.md,
  },
  section: {
    marginBottom: globalStyles.margin.lg,
  },
  sectionTitle: {
    marginBottom: globalStyles.margin.xs,
  },
  sectionBody: {
    lineHeight: 22,
  },
  bold: {
    marginBottom: 4,
  },
  disclaimer: {
    marginTop: globalStyles.margin.sm,
    opacity: 0.85,
  },
  button: {
    marginTop: globalStyles.margin.xl,
  },
});
