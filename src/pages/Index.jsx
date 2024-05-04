import React, { useState } from "react";
import { Container, VStack, Button, Input, Textarea, Heading, Box, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const addEvent = () => {
    if (!newEvent.name || !newEvent.description) {
      toast({
        title: "Error",
        description: "Name and description are required.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setEvents([...events, newEvent]);
    setNewEvent({ name: "", description: "" });
    toast({
      title: "Event Added",
      description: "Your event has been added successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const startEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setNewEvent(events[index]);
  };

  const saveEdit = () => {
    const updatedEvents = [...events];
    updatedEvents[editIndex] = newEvent;
    setEvents(updatedEvents);
    setNewEvent({ name: "", description: "" });
    setIsEditing(false);
    setEditIndex(null);
    toast({
      title: "Event Updated",
      description: "Your event has been updated successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    toast({
      title: "Event Deleted",
      description: "Your event has been deleted successfully.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Heading mb={6}>Event Manager</Heading>
        <Box>
          <Input placeholder="Event Name" mb={2} name="name" value={newEvent.name} onChange={handleInputChange} />
          <Textarea placeholder="Event Description" mb={2} name="description" value={newEvent.description} onChange={handleInputChange} />
          {isEditing ? (
            <Button leftIcon={<FaEdit />} colorScheme="blue" onClick={saveEdit}>
              Save Event
            </Button>
          ) : (
            <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addEvent}>
              Add Event
            </Button>
          )}
        </Box>
        {events.map((event, index) => (
          <Box key={index} p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{event.name}</Heading>
            <p>{event.description}</p>
            <IconButton aria-label="Edit Event" icon={<FaEdit />} onClick={() => startEdit(index)} m={1} />
            <IconButton aria-label="Delete Event" icon={<FaTrash />} onClick={() => deleteEvent(index)} m={1} />
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
