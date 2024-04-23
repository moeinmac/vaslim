import Profile from "../user/Profile";

const MessageHeader = ({ data }) => {
  return (
    <header className="fixed top-0 bg-black w-full px-6 py-4 flex items-center justify-between border-b-2 border-zinc-900">
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
