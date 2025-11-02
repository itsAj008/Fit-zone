// Simple Contentful connection test
import { createClient } from 'contentful';

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master';

export async function testContentfulConnection() {
  console.log('🔍 Testing Contentful Connection...');
  console.log('Space ID:', spaceId);
  console.log('Environment:', environment);
  console.log('Access Token:', accessToken ? `${accessToken.slice(0, 8)}...` : 'Not set');

  if (!spaceId || !accessToken) {
    console.error('❌ Contentful credentials not set properly');
    return false;
  }

  try {
    const client = createClient({
      space: spaceId,
      accessToken: accessToken,
      environment: environment
    });

    // Test basic connection
    console.log('📡 Testing basic connection...');
    const space = await client.getSpace();
    console.log('✅ Space connected:', space.name);

    // List all content types
    console.log('📋 Fetching content types...');
    const contentTypes = await client.getContentTypes();
    console.log('📄 Available content types:');
    contentTypes.items.forEach(type => {
      console.log(`  - ${type.sys.id}: ${type.name}`);
    });

    // Test fetching entries
    console.log('🔍 Testing entry fetching...');
    const allEntries = await client.getEntries({ limit: 5 });
    console.log(`📊 Total entries found: ${allEntries.total}`);
    
    if (allEntries.items.length > 0) {
      console.log('📝 Sample entries:');
      allEntries.items.forEach(entry => {
        console.log(`  - Type: ${entry.sys.contentType.sys.id}, ID: ${entry.sys.id}`);
      });
    } else {
      console.log('📭 No entries found in space');
    }

    return true;
  } catch (error) {
    console.error('❌ Contentful connection failed:', error);
    return false;
  }
}

// Test specific content types we're trying to use
export async function testSpecificContentTypes() {
  const contentTypesToTest = [
    'tcFitness' // Your single content type with all fields
  ];

  const client = createClient({
    space: spaceId!,
    accessToken: accessToken!,
    environment: environment
  });

  console.log('🎯 Testing specific content types...');
  
  for (const contentType of contentTypesToTest) {
    try {
      const entries = await client.getEntries({ content_type: contentType, limit: 5 });
      console.log(`✅ ${contentType}: ${entries.total} entries found`);
      
      // Show entry details
      if (entries.items.length > 0) {
        entries.items.forEach((entry, index) => {
          console.log(`  Entry ${index + 1}:`, entry.sys.id);
          const fields = entry.fields;
          if (fields.title) console.log(`    Hero Title: ${fields.title}`);
          if (fields.membershipPlanName) console.log(`    Plan Name: ${fields.membershipPlanName}`);
          if (fields.trainerName) console.log(`    Trainer Name: ${fields.trainerName}`);
        });
      }
    } catch (error: any) {
      console.log(`❌ ${contentType}: ${error.message}`);
    }
  }
}
