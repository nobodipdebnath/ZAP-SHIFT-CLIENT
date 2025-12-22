import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../Hooks/useAuth';

const Profile = () => {
  const { user } = useAuth(); // firebase user
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/${user.email}`)
        .then(res => {
          setProfile(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col md:flex-row gap-8">
        
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={profile?.photo || user?.photoURL}
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-green-blue object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-gray-500 text-sm">Full Name</p>
            <h3 className="text-xl font-semibold">
              {profile?.name || user?.displayName}
            </h3>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <h3 className="text-xl font-semibold">{user?.email}</h3>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <h3 className="text-xl font-semibold">
              {profile?.phone || 'Not Added'}
            </h3>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Role</p>
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium">
              {profile?.role}
            </span>
          </div>

          <button className="mt-6 px-6 py-2 rounded-lg bg-green-blue text-white font-semibold hover:opacity-90">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
