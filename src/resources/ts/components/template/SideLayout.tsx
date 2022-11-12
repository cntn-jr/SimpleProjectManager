import { Grid, GridItem } from "@chakra-ui/react";
import { memo, ReactNode } from "react";
import { Menubar } from "../organisms/Menubar";

type Props = {
    children: ReactNode;
};

export const SideLayout = memo((props: Props) => {
    const { children } = props;
    return (
        <>
            <Grid gap="3">
                <GridItem zIndex="1" position="fixed" w="130px">
                    <Menubar></Menubar>
                </GridItem>
                <GridItem ml="140px">{children}</GridItem>
            </Grid>
        </>
    );
});
