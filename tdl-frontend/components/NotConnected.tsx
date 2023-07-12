import { Card, CardBody, Heading, Box, Text, ListItem, UnorderedList } from '@chakra-ui/react';

const NotConnected = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              INSTRUCTIONS:
            </Heading>
            <Text pt="2" fontSize="sm">
              <UnorderedList>
                <ListItem>Connect your wallet</ListItem>
                <ListItem>Insert your tasks</ListItem>
                <ListItem>Manage whether they are pending or completed</ListItem>
                <ListItem>
                  Boost your productivity with a simple and effective task planner!
                </ListItem>
              </UnorderedList>
            </Text>
          </Box>
        </CardBody>
      </Card>
    </div>
  );
};

export default NotConnected;
