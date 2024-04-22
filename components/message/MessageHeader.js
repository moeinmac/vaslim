import Profile from "../user/Profile";

const MessageHeader = ({ data }) => {
  console.log(data);
  return (
    <header className="px-6 py-4 flex items-center justify-between">
      <Profile
        profile={data.profile}
        fullname={data.fullname}
        username={data.username}
        isVerified={data.isVerified}
        small={true}
      />
    </header>
  );
};

export default MessageHeader;
