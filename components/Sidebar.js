import styled from 'styled-components';
import { Avatar, Button, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from "email-validator";
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

   const createChat = () => {
       const input = prompt("Please enter the email address you want to chat with");

       if (!input) return null;
       
       if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
        //    We need to add the chat into the DB 'chats' collection if it doesn't exists already and is valid
        db.collection('chats').add({
            users: [user.email, input],
        })
       } 
   };
      
   const chatAlreadyExists = (recipientEmail) => 
      !!chatsSnapshot?.docs.find(
          (chat) => 
          chat.data().users.find((user) => user === recipientEmail)?.length > 0);
        //    we won't be using { } here in this function or it's not gonna work

    return (
        <Container>
           <Header>
               <UserAvatar onClick={() => auth.signOut()} />

               <IconsContainer>
                   <IconButton>
                       <ChatIcon />
                   </IconButton>
                   <IconButton>
                      <MoreVertIcon />
                   </IconButton>

               </IconsContainer>

           </Header>

           <Search>
               <SearchIcon />
               <SearchInput placeholder = "Search in chats" />
           </Search>

           <SidebarButton onClick = {createChat}> Start a new chat</SidebarButton>
        </Container>
    )
}

export default Sidebar

const Container = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton =styled(Button)`
  width: 100%;

  &&& {
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
  }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
      opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;