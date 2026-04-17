import { StoreProvider } from "@/lib/StoreContext";
import LocalAuthProviderWrapper from "./providers/LocalAuthProviderWrapper";
import "./global.css";

export const metadata = {
  title: "PredictAI",
  description: "Predictive Maintenance Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LocalAuthProviderWrapper>
          <StoreProvider>
            {children}
          </StoreProvider>
        </LocalAuthProviderWrapper>
      </body>
    </html>
  );
}
