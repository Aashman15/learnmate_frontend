import CollectionCreateDialog from "@/components/collection-create-dialog";
import { Button, Container, Flex, Input, InputGroup } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";

export const Route = createFileRoute("/")({
  component: CollectionsPage,
});

function CollectionsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <>
      <Container mt={"10"}>
        <Flex justifyContent={"space-between"} alignItems={"center"} gap={"4"}>
          <InputGroup startElement={<CiSearch />} width={"md"}>
            <Input placeholder="Search collections..." />
          </InputGroup>
          <Button onClick={() => setIsCreateDialogOpen(!isCreateDialogOpen)}>
            <FaPlus />
            Create Collection
          </Button>
        </Flex>
      </Container>

      {/* Dialogs */}
      <CollectionCreateDialog
        open={isCreateDialogOpen}
        onOpenChange={(d) => setIsCreateDialogOpen(d.open)}
      />
    </>
  );
}
