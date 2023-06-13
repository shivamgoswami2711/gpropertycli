<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Kreait\Firebase\Value\Uid;

class ApiUserController extends Controller
{

    //
    public function user_name_img(Request $request)
    {
        $user_id     = $request['files'];
        error_log($user_id);
        $user = User::select(
            'id',
            'first_name',
            'last_name',
            'image'
        )
            ->where([['id', $user_id]]);

        error_log($user->get());

        return response()->json($user->get());
    }


    public function store(Request $request)
    {
        $uid = $request->uid;

        $existing = User::select('uid')
            ->where('uid', $uid)
            ->pluck('uid');
        if (count($existing)) {
            $user = User::select('uid', 'email', 'id', 'image', 'first_name', 'last_name', 'contact_number')->where('uid', $uid);
            return response()->json($user->get());
        } else {
            if ($request->hasFile('image')) {
                $image = $request->image;
                $filename = 'image_' . rand(100, 999) . '_' . $image->getClientOriginalName();
                $filepath2 = public_path('uploads');
                $image->move($filepath2, $filename);
                $formInput['image'] = $filename;
            }
            $add = User::create([
                'uid' => $uid,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'contact_number' => $request->contact_number,
                'image' => ($request->image != null) ? $formInput['image'] : null,
                'type' => 'User',
            ]);
            if ($add) {
                $user = User::select('uid', 'email', 'id', 'image', 'first_name', 'last_name', 'contact_number')->where('uid', $uid);
                return response()->json($user->get());
            }
        }
    }
    public function update(Request $request)
    {
        $uid = $request->uid;
        if ($request->hasFile('image')) {
            $image = $request->image;
            $filename = 'image_' . rand(100, 999) . '_' . $image->getClientOriginalName();
            $filepath2 = public_path('uploads');
            $image->move($filepath2, $filename);
            $formInput['image'] = $filename;
        }
        $data = [
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'image' => ($request->image != null) ? $formInput['image'] : '',
            'type' => 'User',
        ];
        if (User::where('uid', '=', $uid)->update($data)) {
            $user = User::select('uid', 'email', 'id', 'image', 'first_name', 'last_name', 'contact_number')->where('uid', $uid);
            return response()->json($user->get());
        }
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();

        return redirect()->back()->with('message', "Delete Successfully");
    }
}
