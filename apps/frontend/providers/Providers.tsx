import StyledComponentsRegistry from "./StyledComponentsRegistry";
import { ProviderChakraV3 } from "@/components/ui/provider";


function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
        <ProviderChakraV3>
            {children}
        </ProviderChakraV3>
    </StyledComponentsRegistry>
  )
}

export default Providers;

