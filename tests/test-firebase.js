import dotenv from "dotenv";
import { auth, db } from "../lib/firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// Load environment variables
dotenv.config({ path: ".env.local" });

async function testFirebaseConnection() {
    console.log("🔥 Testing Firebase connection...\n");

    try {
        // Test 1: Check if Firebase is initialized
        console.log("✓ Firebase config loaded");
        console.log(`Project ID: ${db.app.options.projectId}`);
        
        // Test 2: Test Firestore write
        console.log("\n📝 Testing Firestore write...");
        const testData = {
            name: "Test Restaurant",
            category: "restaurant", 
            location: "Berlin",
            createdAt: new Date(),
        };
        
        const docRef = await addDoc(collection(db, "test"), testData);
        console.log("✓ Document written with ID:", docRef.id);
        
        // Test 3: Test Firestore read
        console.log("\n📖 Testing Firestore read...");
        const querySnapshot = await getDocs(collection(db, "test"));
        console.log(`✓ Found ${querySnapshot.size} document(s)`);
        
        // Test 4: Clean up test data
        console.log("\n🧹 Cleaning up test data...");
        await deleteDoc(doc(db, "test", docRef.id));
        console.log("✓ Test document deleted");
        
        // Test 5: Check Auth service
        console.log("\n🔐 Testing Auth service...");
        console.log(`✓ Auth initialized: ${auth.app.name}`);
        
        console.log("\n🎉 All Firebase tests passed! Ready for development.");
        process.exit(0);
        
    } catch (error) {
        console.error("❌ Firebase test failed:", error.message);
        console.error("Full error:", error);
        process.exit(1);
    }
}

testFirebaseConnection();