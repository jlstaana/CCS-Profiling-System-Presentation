<?php

namespace App\Http\Controllers;

use App\Models\ProfileRequest;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getRequests() {
        return response()->json(ProfileRequest::with('user')->where('status', 'pending')->get());
    }

    public function approveRequest(Request $request, $id) {
        $profileReq = ProfileRequest::findOrFail($id);
        $user = User::findOrFail($profileReq->user_id);

        $user->update($profileReq->changes);  // already cast to array by model
        $profileReq->update(['status' => 'approved']);

        Notification::send(
            $user->id,
            $request->user(),
            'profile_approved',
            'Your profile update request has been approved by the admin.',
            '/profile'
        );

        return response()->json(['message' => 'Request approved', 'user' => $user]);
    }

    public function rejectRequest(Request $request, $id) {
        $profileReq = ProfileRequest::findOrFail($id);
        $targetUser = User::findOrFail($profileReq->user_id);
        $profileReq->update(['status' => 'rejected']);

        Notification::send(
            $targetUser->id,
            $request->user(),
            'profile_rejected',
            'Your profile update request was reviewed and could not be approved.',
            '/profile'
        );

        return response()->json(['message' => 'Request rejected']);
    }

    public function getUsers() {
        return response()->json(User::orderBy('created_at', 'desc')->get());
    }

    public function createUser(Request $request) {
        $fields = $request->validate([
            'name'       => 'required|string',
            'email'      => 'required|email|unique:users,email',
            'password'   => 'required|string|min:3',
            'role'       => 'required|in:student,faculty,admin',
            'department' => 'nullable|string',
            'course'     => 'nullable|string',
        ]);

        $user = User::create([
            'name'       => $fields['name'],
            'email'      => $fields['email'],
            'password'   => bcrypt($fields['password']),
            'role'       => $fields['role'],
            'department' => $fields['department'] ?? null,
            'course'     => $fields['course'] ?? null,
        ]);

        return response()->json($user, 201);
    }

    public function updateUser(Request $request, $id) {
        $user = User::findOrFail($id);
        $data = $request->only(['name', 'email', 'role', 'department', 'course', 'bio']);
        if ($request->filled('password')) {
            $data['password'] = bcrypt($request->input('password'));
        }
        $user->update($data);
        return response()->json($user);
    }

    public function deleteUser(Request $request, $id) {
        $user = User::findOrFail($id);
        // Prevent deleting yourself
        if ($user->id === $request->user()->id) {
            return response()->json(['message' => 'Cannot delete your own account'], 403);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted']);
    }
}
