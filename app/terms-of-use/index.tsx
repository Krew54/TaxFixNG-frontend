import { ScreenHeader, ScreenWrapper } from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { globalStyles } from "@/utils";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <ScreenWrapper>
      <ScreenHeader title="Terms of Use" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Section title="1. Introduction">
          Welcome to TaxfixNG ("the App"), a mobile application designed to
          provide tax awareness, basic tax computation tools, and filing
          guidance for users in Nigeria.
          {"\n\n"}
          The App is owned and operated by Blooms Technology Limited, registered
          under the laws of the Federal Republic of Nigeria ("we", "us", "our").
          {"\n\n"}
          By accessing or using the App, you agree to be bound by these Terms of
          Use ("Terms"). If you do not agree, please do not use the App.
        </Section>

        <Section title="2. Eligibility">
          You must be at least 18 years old and legally capable of entering into
          binding agreements under Nigerian law to use this App.
        </Section>

        <Section title="3. Scope of Services">
          TaxfixNG provides:
          {"\n\n"}• General tax education and awareness content for Nigeria
          {"\n"}• Estimated tax calculations based on user-provided information
          {"\n"}• Guided tax filing support{"\n"}• Upload and storage of
          tax-related documents
          {"\n\n"}
          <ThemedText style={styles.disclaimer} type="default">
            Important Disclaimer: TaxfixNG provides automated tools and guidance
            to assist users with tax compliance. It does not replace
            professional tax, accounting, or legal advice. Final assessments
            remain subject to review by FIRS or relevant State Internal Revenue
            Services.
          </ThemedText>
        </Section>

        <Section title="4. User Responsibilities">
          You agree to:
          {"\n\n"}• Provide accurate and complete information{"\n"}• Use the App
          only for lawful purposes{"\n"}• Not misuse or disrupt the App
          {"\n\n"}
          You are solely responsible for decisions taken based on information
          obtained from the App.
        </Section>

        <Section title="5. Intellectual Property">
          All content, software, trademarks, logos, and materials in the App are
          the exclusive property of Blooms Technology Limited and are protected
          under Nigerian intellectual property laws.
        </Section>

        <Section title="6. Limitation of Liability">
          To the maximum extent permitted under Nigerian law:
          {"\n\n"}• We do not guarantee acceptance of tax filings{"\n"}• We are
          not liable for penalties arising from incorrect user data{"\n"}• Use
          of the App is at your own risk
        </Section>

        <Section title="7. Third-Party Services">
          The App may link to third-party websites or services. We are not
          responsible for their content or practices.
        </Section>

        <Section title="8. Suspension and Termination">
          We may suspend or terminate access if you violate these Terms, provide
          false information, or if required by law.
        </Section>

        <Section title="9. Freemium, Payments & Subscriptions">
          TaxfixNG operates on a freemium model.
          {"\n\n"}
          Payments for premium services are disclosed clearly and are
          non-refundable once a tax filing process has commenced, except where
          required by law.
        </Section>

        <Section title="10. Governing Law">
          These Terms shall be governed by and construed in accordance with the
          laws of the Federal Republic of Nigeria.
        </Section>

        <Section title="11. Contact Information">
          For questions regarding these Terms:
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
  disclaimer: {
    marginTop: globalStyles.margin.sm,
    opacity: 0.85,
  },
  button: {
    marginTop: globalStyles.margin.xl,
  },
});
