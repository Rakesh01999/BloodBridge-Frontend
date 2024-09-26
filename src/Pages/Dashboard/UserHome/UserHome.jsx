
import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
    const { user } = useAuth();
    return (
        <div>
            <h2 className="text-xl md:text-3xl lg:text-4xl mt-20 mx-auto">
                <span>Hi Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>
        </div>
    );
};

export default UserHome;