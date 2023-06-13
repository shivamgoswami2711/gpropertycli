<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Illuminate\Support\Facades\Auth;

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Models\Property;
use App\Models\Recently_viewed;
use App\Models\User;
use Error;
use Exception;

class ApiPropertyController extends Controller
{
    //
    public function property(Request $request)
    {
        $sale_property = Property::select(
            'properties.id',
            'properties.added_by',
            'properties.property_for',
            'properties.property_type',
            'properties.lat',
            'properties.long',
            'properties.image',
            'properties.bedrooms',
            'properties.beds',
            'properties.video',
            'properties.bathrooms',
            'properties.saleable_area',
            'properties.saleable_area_size_in',
            'properties.created_at',
            'properties.expected_price',
            'properties.monthly_rent',
            'properties.location',
            'users.first_name',
            'users.last_name',
            'users.image as profile_image'
        )
            ->join('users', 'users.id', 'properties.added_by')
            ->where([['properties.property_for', $request->property_for], ['properties.admin_status', 'Approved']])->take(20)->orderBy('properties.created_at', 'desc');

        return $sale_property->get();
    }


    public function getOneProperty(Request $request)
    {
        $sale_property = Property::select(
            'properties.id',
            'properties.added_by',
            'properties.property_for',
            'properties.property_type',
            'properties.lat',
            'properties.long',
            'properties.image',
            'properties.bedrooms',
            'properties.beds',
            'properties.video',
            'properties.bathrooms',
            'properties.saleable_area',
            'properties.saleable_area_size_in',
            'properties.created_at',
            'properties.expected_price',
            'properties.monthly_rent',
            'properties.location',
            'users.first_name',
            'users.last_name',
            'users.image as profile_image'
        )
            ->join('users', 'users.id', 'properties.added_by')
            ->where([['properties.id', $request->id], ['properties.admin_status', 'Approved']])->take(1);

        return $sale_property->get();
    }
    public function buy(Request $request)
    {
        $bedrooms  = $request->bedrooms;
        $property_type  = $request->property_type;
        $bathrooms  = $request->bathrooms;
        $price_min  = $request->price_min;
        $price_max    = $request->price_max;
        $area_min  = $request->area_min;
        $area_max    = $request->area_max;
        $address    = $request->location;


        $sale_property = Property::select(
            'properties.id',
            'properties.added_by',
            'properties.property_for',
            'properties.property_type',
            'properties.lat',
            'properties.long',
            'properties.image',
            'properties.bedrooms',
            'properties.beds',
            'properties.video',
            'properties.bathrooms',
            'properties.saleable_area',
            'properties.saleable_area_size_in',
            'properties.created_at',
            'properties.expected_price',
            'properties.location',
            'users.first_name',
            'users.last_name',
            'users.image as profile_image'
        )->join('users', 'users.id', 'properties.added_by')
            ->where([['properties.property_for', 'sell'], ['properties.admin_status', 'Approved']])
            ->orderBy('properties.created_at', 'desc');



        $propertytype = $sale_property->distinct()->pluck('properties.property_type')->unique()->values();


        if (isset($property_type) && !empty($property_type)) {
            $sale_property = $sale_property->where('properties.property_type', '=', $property_type);
        }


        $price_max = $sale_property->max(DB::raw('CAST(properties.expected_price AS UNSIGNED)'));
        $minprice = $sale_property->min(DB::raw('CAST(properties.expected_price AS UNSIGNED)'));


        if (isset($bedrooms) && !empty($bedrooms)) {
            $sale_property = $sale_property->where('properties.bedrooms', '=', $bedrooms);
        }
        if (isset($bathrooms) && !empty($bathrooms)) {
            $sale_property = $sale_property->where('properties.bathrooms', '=', $bathrooms);
        }
        if (isset($address) && !empty($address)) {
            $sale_property = $sale_property->where('properties.location', 'LIKE', "%{$address}%");
        }

        if (isset($price_min) && !empty($price_min)) {
            $sale_property = $sale_property->whereRaw('CAST(properties.expected_price AS UNSIGNED) BETWEEN ? AND ?', [$price_min, $price_max]);
        }

        if (isset($area_min) && !empty($area_min)) {
            $sale_property = $sale_property->where('properties.saleable_area', '>=', $area_min);
        }
        if (isset($area_max) && !empty($area_max)) {
            $sale_property = $sale_property->where('properties.saleable_area', '<=', $area_max);
        }


        $coordinates = Property::select('id', 'lat', 'long')->where([['property_for', 'sell'], ['admin_status', 'Approved']])
            ->orderBy('created_at', 'desc');

        if (isset($property_type) && !empty($property_type)) {
            $coordinates = $coordinates->where('property_type', '=', $property_type);
        }

        if (isset($address) && !empty($address)) {
            $coordinates = $coordinates->where('location', 'LIKE', "%{$address}%");
        }

        if (isset($price_min) && !empty($price_min)) {
            $coordinates = $coordinates->whereRaw('CAST(expected_price AS UNSIGNED) BETWEEN ? AND ?', [$price_min, $price_max]);
        }

        if (isset($area_min) && !empty($area_min)) {
            $coordinates = $coordinates->where('saleable_area', '>=', $area_min);
        }
        if (isset($area_max) && !empty($area_max)) {
            $coordinates = $coordinates->where('saleable_area', '<=', $area_max);
        }




        $sale_property = $sale_property->paginate(10);

        $response = [
            'max_price' => $price_max,
            'min_price' => $minprice,
            'property_type' => $propertytype,
            'sale_properties' => $sale_property,
            'coordinates' => $coordinates->get(),
        ];

        return response()->json($response);
    }

    public function rent(Request $request)
    {
        $bedrooms  = $request->bedrooms;
        $property_type  = $request->property_type;
        $bathrooms  = $request->bathrooms;
        $price_min  = $request->price_min;
        $price_max    = $request->price_max;
        $area_min  = $request->area_min;
        $area_max    = $request->area_max;
        $address    = $request->location;


        $sale_property = Property::select(
            'properties.id',
            'properties.added_by',
            'properties.property_for',
            'properties.property_type',
            'properties.lat',
            'properties.long',
            'properties.image',
            'properties.bedrooms',
            'properties.beds',
            'properties.video',
            'properties.bathrooms',
            'properties.saleable_area',
            'properties.saleable_area_size_in',
            'properties.created_at',
            'properties.monthly_rent',
            'properties.location',
            'users.first_name',
            'users.last_name',
            'users.image as profile_image'
        )
            ->join('users', 'users.id', 'properties.added_by')
            ->where([['properties.property_for', 'rent'], ['properties.admin_status', 'Approved']])
            ->orderBy('properties.created_at', 'desc');

        $propertytype = $sale_property->distinct()->pluck('properties.property_type')->unique()->values();

        if (isset($property_type) && !empty($property_type)) {
            $sale_property = $sale_property->where('properties.property_type', '=', $property_type);
        }

        $price_max = $sale_property->max(DB::raw('CAST(properties.monthly_rent AS UNSIGNED)'));
        $minprice = $sale_property->min(DB::raw('CAST(properties.monthly_rent AS UNSIGNED)'));


        if (isset($bedrooms) && !empty($bedrooms)) {
            $sale_property = $sale_property->where('properties.bedrooms', '=', $bedrooms);
        }
        if (isset($bathrooms) && !empty($bathrooms)) {
            $sale_property = $sale_property->where('properties.bathrooms', '=', $bathrooms);
        }
        if (isset($address) && !empty($address)) {
            $sale_property = $sale_property->where('properties.location', 'LIKE', "%{$address}%");
        }


        if (isset($price_min) && !empty($price_min)) {
            $sale_property = $sale_property->whereRaw('CAST(properties.monthly_rent AS UNSIGNED) BETWEEN ? AND ?', [$price_min, $price_max]);
        }

        if (isset($area_min) && !empty($area_min)) {
            $sale_property = $sale_property->where('properties.saleable_area', '>=', $area_min);
        }
        if (isset($area_max) && !empty($area_max)) {
            $sale_property = $sale_property->where('properties.saleable_area', '<=', $area_max);
        }

        $coordinates = Property::select('id', 'lat', 'long')->where([['property_for', 'rent'], ['admin_status', 'Approved']])
            ->orderBy('created_at', 'desc');

        if (isset($property_type) && !empty($property_type)) {
            $coordinates = $coordinates->where('property_type', '=', $property_type);
        }

        if (isset($address) && !empty($address)) {
            $coordinates = $coordinates->where('location', 'LIKE', "%{$address}%");
        }

        if (isset($price_min) && !empty($price_min)) {
            $coordinates = $coordinates->whereRaw('CAST(monthly_rent AS UNSIGNED) BETWEEN ? AND ?', [$price_min, $price_max]);
        }

        if (isset($area_min) && !empty($area_min)) {
            $coordinates = $coordinates->where('saleable_area', '>=', $area_min);
        }
        if (isset($area_max) && !empty($area_max)) {
            $coordinates = $coordinates->where('saleable_area', '<=', $area_max);
        }


        $sale_property = $sale_property->paginate(10);


        $response = [
            'max_price' => $price_max,
            'min_price' => $minprice,
            'property_type' => $propertytype,
            'sale_properties' => $sale_property,
            'coordinates' => $coordinates->get(),
        ];

        return response()->json($response);
    }
    public function user_property(Request $request)
    {
        $id     = $request->id;
        $uid     = $request->uid;

        $existing = User::select('uid')
            ->where('uid', $uid)
            ->pluck('uid');
        if (count($existing)) {

            $property = Property::select(
                'id',
                'added_by',
                'property_for',
                'property_type',
                'image',
                'location',
                'admin_status'

            )->orderBy('created_at', 'desc');


            if (isset($id) && !empty($id)) {
                $property = $property->where('added_by', '=', $id);
            }


            return response()->json($property->get());
        }
    }



    public function search_property(Request $request)
    {
        $property_for     = $request->property_for;
        $property_type  = $request->property_type;
        $price_min  = $request->price_min;
        $price_max    = $request->price_max;
        $address    = $request->location;

        error_log($property_for);

        $property = Property::select(
            'properties.id',
            'properties.added_by',
            'properties.property_for',
            'properties.property_type',
            'properties.lat',
            'properties.long',
            'properties.image',
            'properties.bedrooms',
            'properties.beds',
            'properties.video',
            'properties.bathrooms',
            'properties.saleable_area',
            'properties.saleable_area_size_in',
            'properties.created_at',
            'properties.expected_price',
            'properties.monthly_rent',
            'properties.location',
            'users.first_name',
            'users.last_name',
            'users.image as profile_image'
        )
            ->join('users', 'users.id', 'properties.added_by')
            ->where([['properties.admin_status', 'Approved']])
            ->orderBy('properties.created_at', 'desc');


        if (isset($property_for) && !empty($property_for)) {
            $property = $property->where('properties.property_for', '=', $property_for);
        }

        $propertytype = $property->distinct()->pluck('properties.property_type')->unique()->values();

        if (isset($property_type) && !empty($property_type)) {
            $property = $property->where('properties.property_type', '=', $property_type);
        }

        $maxprice = $property->max(DB::raw('CAST(properties.monthly_rent AS UNSIGNED)'));
        $minprice = $property->min(DB::raw('CAST(properties.monthly_rent AS UNSIGNED)'));

        if (isset($address) && !empty($address)) {
            $property = $property->where('properties.location', 'LIKE', "%{$address}%");
        }
        if (isset($price_min) && !empty($price_min)) {

            $property = $property->where(function ($query) use ($price_min, $price_max) {
                $query->where(function ($query) use ($price_min, $price_max) {
                    $query->whereNotNull('properties.expected_price')
                        ->whereRaw('CAST(properties.expected_price AS UNSIGNED) BETWEEN ? AND ?', [$price_min, $price_max]);
                })
                    ->orWhere(function ($query) use ($price_min, $price_max) {
                        $query->whereNotNull('properties.monthly_rent')
                            ->whereRaw('CAST(properties.monthly_rent AS UNSIGNED) BETWEEN ? AND ?', [$price_min, $price_max]);
                    });
            });
        }



        $coordinates = Property::select('id', 'lat', 'long')->where([['admin_status', 'Approved']])
            ->orderBy('created_at', 'desc');


        if (isset($property_for) && !empty($property_for)) {
            $coordinates = $coordinates->where('property_for', '=', $property_for);
        }

        if (isset($property_type) && !empty($property_type)) {
            $coordinates = $coordinates->where('property_type', '=', $property_type);
        }

        if (isset($address) && !empty($address)) {
            $coordinates = $coordinates->where('location', 'LIKE', "%{$address}%");
        }

        if (isset($price_min) && !empty($price_min)) {

            $coordinates = $coordinates->where(function ($query) use ($price_min, $price_max) {
                $query->where(function ($query) use ($price_min, $price_max) {
                    $query->whereNotNull('expected_price')
                        ->whereRaw('CAST(expected_price AS UNSIGNED) BETWEEN ? AND ?', [$price_min, $price_max]);
                })
                    ->orWhere(function ($query) use ($price_min, $price_max) {
                        $query->whereNotNull('monthly_rent')
                            ->whereRaw('CAST(monthly_rent AS UNSIGNED) BETWEEN ? AND ?', [$price_min, $price_max]);
                    });
            });
        }


        if (isset($area_min) && !empty($area_min)) {
            $coordinates = $coordinates->where('saleable_area', '>=', $area_min);
        }
        if (isset($area_max) && !empty($area_max)) {
            $coordinates = $coordinates->where('saleable_area', '<=', $area_max);
        }


        $property = $property->paginate(10);


        $response = [
            'max_price' => $maxprice,
            'min_price' => $minprice,
            'property_type' => $propertytype,
            'sale_properties' => $property,
            'coordinates' => $coordinates->get(),
        ];

        return response()->json($response);
    }



    public function storeProperty(Request $request)
    {

        $existing = User::select('id')
            ->where('id', $request->id)
            ->pluck('id');
        if (count($existing)) {

            if ($request['files'] == null) {
                $forminput['images'] = null;
                $forminput['image'] = null;
            } else {
                $id = 1;
                $s = [];
                $image_arr = [];
                $image = [];
                foreach ($request['files'] as $k => $v) {
                    $file = $v;
                    $file_name = $file->getClientOriginalName();
                    $fileName = "pro_" . rand(1000, 9999) . $id . "." . str_replace(' ', '', $file_name);
                    $filepath = public_path('/uploads');
                    $file->move($filepath, $fileName);
                    $s['id']                   = $id;
                    $s['image_type']           = ($request['image_type'][$k] != null) ? $request['image_type'][$k] : null;
                    $s['make_display_image']   = ($request->make_display_image == $file_name) ? 'yes' : null;
                    $s['images']               = $fileName;
                    $image[]                  = ($request->make_display_image == $file_name) ? $fileName : null;
                    $image_arr[]               = $s;
                    $id++;
                }
                foreach ($image as $k => $v) {
                    if ($v == null) {
                        $im = null;
                    } else {
                        $im = $v;
                    }
                }
                $image_arr = json_encode($image_arr);
                $forminput['images'] = $image_arr;
                $forminput['image'] = $im;
            }


            //video code
            if ($request->hasFile('video')) {
                $i = 1;
                $file = $request->video;
                $file_name = $file->getClientOriginalName();
                $fileName = "video_" . rand(1000, 9999) . $i . "." . str_replace(' ', '',  $file_name);
                $filepath = public_path('/videos');
                $file->move($filepath, $fileName);
            } else {
                $fileName = null;
            }


            //     // price for pg hostel code
            if ($request['room_data']['room_type'] != null) {
                $addon_arr = array();
                $fd = 1;
                $st = [];
                foreach ($request['room_data']['room_type'] as $k => $v) {
                    $st['id']        = $fd;
                    $st['room_type'] = $v;
                    $st['no_of_rooms']     = $request['room_data']['no_of_rooms'][$k];
                    $st['price']     = $request['room_data']['price'][$k];
                    $addon_arr[]    = $st;
                    $fd++;
                }
                $addon_arr                = json_encode($addon_arr);
                $forminput['room_data'] = $addon_arr;
            } else {
                $forminput['room_data'] = null;
            }



            $add = Property::create([
                'added_by' => $request->id,
                'location' => $request->location,
                'saleable_area' => $request->saleable_area,
                'views' => '0',
                'admin_status' => 'Pending',
                'property_for' => $request->property_for,
                'lat' => $request->latitude,
                'long' => $request->longitude,
                'property_type' => $request->property_type,
                'added_by_type' => $request->added_by_type,
                'bedrooms' => $request->bedrooms,
                'saleable_area_size_in' => $request->saleable_area_size_in,
                'carpet_area' => $request->carpet_area,
                'carpet_area_size_in' => $request->carpet_area_size_in,
                'bathrooms' => $request->bathrooms,
                'balconies' => $request->balconies,
                'additional_facility' => $request->additional_facility,
                'expected_price' => $request->expected_price,
                'expected_price_in_sqft' => $request->expected_price_in_sqft,
                'booking_price' => $request->booking_price,
                'monthly_rent' => $request->monthly_rent,
                'security_deposit' => $request->security_deposit,
                'maintance_charge' => $request->maintance_charge,
                'available_from' => $request->available_from,
                'property_status' => $request->property_status,
                'property_age' => $request->property_age,
                'possession_date' => $request->possession_date,
                'description' => $request->description,
                'furnishing_status' => $request->furnishing_status,
                'wardrobe' => $request->wardrobe,
                'beds' => $request->beds,
                'ac' => $request->ac,
                'tv' => $request->tv,
                'additional_furnishing' => $request->additional_furnishing,
                'other_facility' => $request->other_facility,
                'car_parking_open' => $request->car_parking_open,
                'car_parking_close' => $request->car_parking_close,
                'floor' => $request->floor,
                'total_floor' => $request->total_floor,
                'open_side' => $request->open_side,
                'facing_side' => $request->facing_side,
                'facing_road_width' => $request->facing_road_width,
                'facing_road_width_in' => $request->facing_road_width_in,
                'overlooking' => $request->overlooking,
                'ownershiptype' => $request->ownershiptype,
                'living_room' => $request->living_room,
                'kitchen' => $request->kitchen,
                'master_bedroom' => $request->master_bedroom,
                'bathroom' => $request->bathroom,
                'balcony' => $request->balcony,
                'other_bedroom' => $request->other_bedroom,
                'preferred_tenants' => $request->preferred_tenants,
                'gender_preference' => $request->gender_preference,
                'maximum_tentants_allowed' => $request->maximum_tentants_allowed,
                'work_preference' => $request->work_preference,
                'food_preference' => $request->food_preference,
                'expected_duration_of_stay' => $request->expected_duration_of_stay,
                'special_requirement' => $request->special_requirement,
                'images' => $forminput['images'],
                'image' => $forminput['image'],
                'room_data' => $forminput['room_data'],
                'video' => $fileName,
            ]);

            error_log("sab kuch dal diya daya");
            if ($add) {
                error_log("ho gaya");
            } else {
                //     // return redirect('/add_property')->with('emessage', 'Something went wrong.');
                error_log("chud gai");
            }
        }
    }
    public function oneproperty(Request $request)
    {

        $id     = $request->id;
        $uid     = $request->uid;

        $existing = User::select('uid')
            ->where('uid', $uid)
            ->pluck('uid');
        if (count($existing)) {


            $property = Property::select(
                'added_by',
                'location',
                'saleable_area',
                'views',
                'admin_status',
                'property_for',
                'lat',
                'long',
                'property_type',
                'added_by_type',
                'bedrooms',
                'saleable_area_size_in',
                'carpet_area',
                'carpet_area_size_in',
                'bathrooms',
                'balconies',
                'additional_facility',
                'expected_price',
                'expected_price_in_sqft',
                'booking_price',
                'monthly_rent',
                'security_deposit',
                'maintance_charge',
                'available_from',
                'property_status',
                'property_age',
                'possession_date',
                'description',
                'furnishing_status',
                'wardrobe',
                'beds',
                'ac',
                'tv',
                'additional_furnishing',
                'other_facility',
                'car_parking_open',
                'car_parking_close',
                'floor',
                'total_floor',
                'open_side',
                'facing_side',
                'facing_road_width',
                'facing_road_width_in',
                'overlooking',
                'ownershiptype',
                'living_room',
                'kitchen',
                'master_bedroom',
                'bathroom',
                'balcony',
                'other_bedroom',
                'preferred_tenants',
                'gender_preference',
                'maximum_tentants_allowed',
                'work_preference',
                'food_preference',
                'expected_duration_of_stay',
                'special_requirement',
                'images',
                'image',
                'room_data',
                'video'
            )->where('id', $id);
            return response()->json($property->get());
        }
    }
    public function properties_update(Request $request, $id)
    {


        if ($request['files'] == null) {
            if ($request['old_image'] == null) {
                $forminput['images'] = null;
                $forminput['image'] = null;
            } else {
                $id1 = 1;
                $image_arr1 = [];
                foreach ($request['old_image'] as $k1 => $v1) {
                    $s['id']                   = $id1;
                    $s['image_type']           = ($request['old_image_type'][$k1] != null) ? $request['old_image_type'][$k1] : null;
                    $s['make_display_image']   = ($request->old_make_display_image == $v1) ? 'yes' : null;
                    $s['images']               = $v1;
                    $ima                    = ($request->old_make_display_image == $v1) ? $v1 : null;
                    $image[]                  = $ima;
                    $image_arr1[]               = $s;
                    $id1++;
                }
                foreach ($image as $k => $v) {
                    if ($v == null) {
                        $im = null;
                    } else {
                        $im = $v;
                    }
                }
                $image_arr1 = json_encode($image_arr1);
                $forminput['images'] = $image_arr1;
                $forminput['image'] = $im;
            }
        } else {
            if ($request['old_image'] == null) {
                $id = 1;
                $image_arr = [];
                $image = [];
                foreach ($request['files'] as $k => $v) {
                    $file = $v;
                    $file_name = $file->getClientOriginalName();
                    $fileName = "pro_" . rand(1000, 9999) . $id . "." . $file->getClientOriginalExtension();
                    $filepath = public_path('/uploads');
                    $file->move($filepath, $fileName);

                    $s['id']                   = $id;
                    $s['image_type']           = ($request['image_type'][$k] != null) ? $request['image_type'][$k] : null;
                    $s['make_display_image']   = ($request->make_display_image == $file_name) ? 'yes' : null;
                    $s['images']               = $fileName;
                    $ima                    = ($request->make_display_image == $file_name) ? $fileName : null;
                    $image[]                  = $ima;
                    $image_arr[]               = $s;
                    $id++;
                }
                foreach ($image as $k => $v) {
                    if ($v == null) {
                        $im = null;
                    } else {
                        $im = $v;
                    }
                }
                $image_arr = json_encode($image_arr);
                $forminput['images'] = $image_arr;
                $forminput['image'] = $im;
            } else {
                $id1 = 1;
                $image_arr1 = [];
                $image1 = [];
                foreach ($request['old_image'] as $k1 => $v1) {

                    $s['id']                   = $id1;
                    $s['image_type']           = ($request['old_image_type'][$k1] != null) ? $request['old_image_type'][$k1] : null;
                    $s['make_display_image']   = ($request->old_make_display_image == $v1) ? 'yes' : null;
                    $s['images']               = $v1;
                    $image1[]                  = ($request->old_make_display_image == $v1) ? $v1 : null;
                    $image_arr1[]               = $s;
                    $id1++;
                }
                $x = 1;
                $id = $x + count($image_arr1);
                $image_arr = [];
                $image = [];
                foreach ($request['files'] as $k => $v) {
                    $file = $v;
                    $file_name = $file->getClientOriginalName();
                    $fileName = "pro_" . rand(1000, 9999) . $id . "." . $file->getClientOriginalExtension();
                    $filepath = public_path('/uploads');
                    $file->move($filepath, $fileName);

                    $s['id']                   = $id;
                    $s['image_type']           = ($request['image_type'][$k] != null) ? $request['image_type'][$k] : null;
                    $s['make_display_image']   = ($request->make_display_image == $file_name) ? 'yes' : null;
                    $s['images']               = $fileName;
                    $image[]                  = ($request->make_display_image == $file_name) ? $fileName : null;
                    $image_arr[]               = $s;
                    $id++;
                }
                $kky = array_merge($image1, $image);
                foreach ($kky as $k => $v) {
                    if ($v == null) {
                        $im = null;
                    } else {
                        $im = $v;
                    }
                }
                $ayy = array_merge($image_arr1, $image_arr);
                $ayy = json_encode($ayy);
                $forminput['images'] = $ayy;
                $forminput['image'] = $im;
            }
        }
        //video code
        if ($request->hasFile('video')) {
            $id = 1;
            $file = $request->video;
            $file_name = $file->getClientOriginalName();
            $fileName = "video_" . rand(1000, 9999) . $id . "." . $file->getClientOriginalExtension();
            $filepath = public_path('/videos');
            $file->move($filepath, $fileName);
        } else {
            if ($request->old_video != null) {
                $fileName = $request->old_video;
            } else {
                $fileName = null;
            }
        }
        // price for pg hostel code
        if (isset($request['room_data']['room_type'])) {
            $addon_arr = array();
            $id = 1;
            foreach ($request['room_data']['room_type'] as $k => $v) {
                $s['id']        = $id;
                $s['room_type'] = $v;
                $s['no_of_rooms']     = $request['room_data']['no_of_rooms'][$k];
                $s['price']     = $request['room_data']['price'][$k];
                $addon_arr[]    = $s;
                $id++;
            }
            $addon_arr                = json_encode($addon_arr);
            $forminput['room_data'] = $addon_arr;
        } else {
            $forminput['room_data'] = null;
        }
        $data = [
            'added_by' => $request->added_by,
            'property_for' => $request->property_for,
            'lat' => $request->latitude,
            'long' => $request->longitude,
            'property_type' => $request->property_type,
            'added_by_type' => 'Admin',
            'location' => $request->location,
            'bedrooms' => $request->bedrooms,
            'saleable_area' => $request->saleable_area,
            'saleable_area_size_in' => $request->saleable_area_size_in,
            'carpet_area' => $request->carpet_area,
            'carpet_area_size_in' => $request->carpet_area_size_in,
            'bathrooms' => $request->bathrooms,
            'balconies' => $request->balconies,
            'additional_facility' => isset($request->additional_facility) ? implode(',', $request->additional_facility) : null,
            'expected_price' => $request->expected_price,
            'expected_price_in_sqft' => $request->expected_price_in_sqft,
            'booking_price' => $request->booking_price,
            'monthly_rent' => $request->monthly_rent,
            'security_deposit' => $request->security_deposit,
            'maintance_charge' => $request->maintance_charge,
            'available_from' => $request->available_from,
            'property_status' => $request->property_status,
            'property_age' => $request->property_age,
            'possession_date' => $request->possession_date,
            'description' => $request->description,
            'furnishing_status' => $request->furnishing_status,
            'wardrobe' => $request->wardrobe,
            'beds' => $request->beds,
            'ac' => $request->ac,
            'tv' => $request->tv,
            'additional_furnishing' => isset($request->additional_furnishing) ? implode(',', $request->additional_furnishing) : null,
            'other_facility' => isset($request->other_facility) ? implode(',', $request->other_facility) : null,
            'car_parking_open' => $request->car_parking_open,
            'car_parking_close' => $request->car_parking_close,
            'floor' => $request->floor,
            'total_floor' => $request->total_floor,
            'open_side' => $request->open_side,
            'facing_side' => $request->facing_side,
            'facing_road_width' => $request->facing_road_width,
            'facing_road_width_in' => $request->facing_road_width_in,
            'overlooking' => isset($request->overlooking) ? implode(',', $request->overlooking) : null,
            'ownershiptype' => $request->ownershiptype,
            'living_room' => $request->living_room,
            'kitchen' => $request->kitchen,
            'master_bedroom' => $request->master_bedroom,
            'bathroom' => $request->bathroom,
            'balcony' => $request->balcony,
            'other_bedroom' => $request->other_bedroom,
            'preferred_tenants' => $request->preferred_tenants,
            'gender_preference' => $request->gender_preference,
            'maximum_tentants_allowed' => $request->maximum_tentants_allowed,
            'work_preference' => $request->work_preference,
            'food_preference' => $request->food_preference,
            'expected_duration_of_stay' => $request->expected_duration_of_stay,
            'special_requirement' => $request->special_requirement,
            'property_description' => $request->property_description,
            'images' => $forminput['images'],
            'image' => $forminput['image'],
            'video' => $fileName,
            'room_data' => $forminput['room_data'],
            'views' => $request->views,
            'admin_status' => $request->admin_status,
        ];
        if (Property::where('id', '=', $request->property_id)->update($data)) {
            return redirect('/my_listing')->with('message', 'Successfully Updated.');
        } else {
            return redirect()->back()->with('emessage', 'something went wrong');
        }
    }

    public function deleteProperty(Request $request)
    {

        $id     = $request->id;
        $user_id     = $request->user_id;
        $uid     = $request->uid;

        $existing = User::select('uid')
            ->where('uid', $uid)
            ->pluck('uid');
        if (count($existing)) {
            $property = Property::find($request->id);
            $property->delete();

            $property = Property::select(
                'id',
                'added_by',
                'property_for',
                'property_type',
                'image',
                'location'
            )
                ->where([['admin_status', 'Pending']])

                ->orderBy('created_at', 'desc');


            if (isset($id) && !empty($id)) {
                $property = $property->where('added_by', '=', $user_id);
            }



            return response()->json($property->get());
        }
    }

    public function send_mail_to_owner(Request $request)
    {


        $uid     = $request->uid;


        $existing = User::select('uid')
            ->where('uid', $uid)
            ->pluck('uid');

        if (count($existing)) {

            if ($request) {

                $add = Contact::create([
                    'property_id' => $request->property_id,
                    'name' => $request->name,
                    'address' => $request->address,
                    'contact_number' => $request->contact_number,
                    'emailSent' => false
                ]);
                if ($add) {
                    $data = [
                        'save' => true,
                    ];
                    return response()->json($data);
                } else {
                    $data = [
                        'save' => false,
                    ];
                    return response()->json($data);
                }
            }
        }
    }
    public function i_am_interested(Request $request)
    {


        $uid     = $request->uid;
        $existing = User::select('uid')
            ->where('uid', $uid)
            ->pluck('uid');
        if (count($existing)) {
            if ($request) {

                Recently_viewed::create([
                    'login_id' => $request->id,
                    'property_id' => $request->property_id,
                ]);
                error_log("done");
                $data = [
                    'save' => true,
                ];
                return response()->json($data);
            }
        }
    }

    public function recently_view(Request $request)
    {
        error_log("helo");

        // $id     = $request->id;
        // $uid     = $request->uid;
        // $existing = User::select('uid')
        //     ->where('uid', $uid)
        //     ->pluck('uid');
        // // if (count($existing)) {

            $property = Property::select('recently_viewed.id as recent_id', 'properties.id', 'properties.video', 'properties.image', 'properties.property_for', 'properties.property_type', 'properties.added_by', 'properties.updated_at', 'properties.views', 'properties.admin_status')
                ->join('recently_viewed', 'recently_viewed.property_id', 'properties.id')
                ->where('recently_viewed.login_id', '=',36);

            $property = $property->paginate(10);

            response()->json($property->get());
        // }
    }
}
