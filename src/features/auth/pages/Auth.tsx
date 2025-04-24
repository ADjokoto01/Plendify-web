import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Text } from "@/components";
import { Login, Register } from "../components";

export const AuthPage = () => {
  return (
    <div className="flex flex-col max-w-[320px] md:max-w-[451px] justify-center items-center mx-auto w-full gap-6">
      <Text variant="h2" weight="medium">
        Shoppers love Plendify
      </Text>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="p-[2px] bg-[#F2F2F3] h-[49px] rounded-none w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Create Account</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Register />
        </TabsContent>
      </Tabs>
    </div>
  );
};
