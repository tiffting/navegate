"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Check } from "lucide-react";

export interface UserPreferences {
  budgetRange: "€" | "€€" | "€€€" | "any";
  minSafetyScore: number;
  dietaryRestrictions: string[];
  maxDistance: number;
  openNow: boolean;
  eatingPreferences: {
    includeBreakfast: boolean;
    includeSnacks: boolean;
    style: "foodie" | "casual" | "efficient";
  };
  mobilityPreferences: {
    transportModes: ("walking" | "public_transit" | "taxi")[];
    wheelchairAccessible: boolean;
    maxWalkingDistance: number;
    preferredPace: "leisurely" | "moderate" | "efficient";
  };
  tripPreferences: {
    planningStyle: "structured" | "flexible";
    groupSize?: number;
  };
}

const defaultPreferences: UserPreferences = {
  budgetRange: "any",
  minSafetyScore: 70,
  dietaryRestrictions: [],
  maxDistance: 5,
  openNow: false,
  eatingPreferences: {
    includeBreakfast: true,
    includeSnacks: false,
    style: "casual",
  },
  mobilityPreferences: {
    transportModes: ["walking", "public_transit"],
    wheelchairAccessible: false,
    maxWalkingDistance: 15,
    preferredPace: "moderate",
  },
  tripPreferences: {
    planningStyle: "flexible",
    groupSize: 2,
  },
};

interface UserPreferencesProps {
  onPreferencesChange?: (preferences: UserPreferences) => void;
}

export default function UserPreferences({ onPreferencesChange }: UserPreferencesProps) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const loadPreferences = () => {
      const saved = localStorage.getItem('veganbnb-preferences');
      if (saved) {
        try {
          const parsedPreferences = JSON.parse(saved);
          setPreferences({ ...defaultPreferences, ...parsedPreferences });
        } catch (error) {
          console.error('Error loading preferences:', error);
        }
      }
    };
    
    loadPreferences();
  }, []);

  // Save preferences to localStorage
  const savePreferences = () => {
    localStorage.setItem('veganbnb-preferences', JSON.stringify(preferences));
    setHasUnsavedChanges(false);
    setSaveSuccess(true);
    onPreferencesChange?.(preferences);
    
    // Show success feedback briefly
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Update preference and mark as unsaved
  const updatePreference = (path: string, value: string | number | boolean) => {
    setPreferences(prev => {
      const newPreferences = { ...prev };
      const keys = path.split('.');
      let current: Record<string, unknown> = newPreferences;
      
      for (let i = 0; i < keys.length - 1; i++) {
        const currentValue = current[keys[i]];
        current[keys[i]] = { ...(currentValue && typeof currentValue === 'object' ? currentValue : {}) } as Record<string, unknown>;
        current = current[keys[i]] as Record<string, unknown>;
      }
      
      current[keys[keys.length - 1]] = value;
      return newPreferences;
    });
    setHasUnsavedChanges(true);
  };

  // Toggle dietary restriction
  const toggleDietaryRestriction = (restriction: string) => {
    setPreferences(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction]
    }));
    setHasUnsavedChanges(true);
  };

  // Toggle transport mode
  const toggleTransportMode = (mode: "walking" | "public_transit" | "taxi") => {
    setPreferences(prev => ({
      ...prev,
      mobilityPreferences: {
        ...prev.mobilityPreferences,
        transportModes: prev.mobilityPreferences.transportModes.includes(mode)
          ? prev.mobilityPreferences.transportModes.filter(m => m !== mode)
          : [...prev.mobilityPreferences.transportModes, mode]
      }
    }));
    setHasUnsavedChanges(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="w-4 h-4" />
          Travel Preferences
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Your Travel Preferences</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Budget Range */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Budget Range</Label>
            <Select
              value={preferences.budgetRange}
              onValueChange={(value: "€" | "€€" | "€€€" | "any") => updatePreference('budgetRange', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="€">€ - Budget-friendly</SelectItem>
                <SelectItem value="€€">€€ - Mid-range</SelectItem>
                <SelectItem value="€€€">€€€ - Premium</SelectItem>
                <SelectItem value="any">Any - No preference</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Safety Score Threshold */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Minimum Safety Score: {preferences.minSafetyScore}+
            </Label>
            <Slider
              value={[preferences.minSafetyScore]}
              onValueChange={(values) => updatePreference('minSafetyScore', values[0])}
              max={95}
              min={50}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>50 - Basic</span>
              <span>75 - Good</span>
              <span>95 - Excellent</span>
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Additional Dietary Restrictions</Label>
            <div className="grid grid-cols-2 gap-2">
              {['gluten-free', 'nut-free', 'soy-free', 'oil-free'].map(restriction => (
                <div key={restriction} className="flex items-center space-x-2">
                  <Checkbox
                    id={restriction}
                    checked={preferences.dietaryRestrictions.includes(restriction)}
                    onCheckedChange={() => toggleDietaryRestriction(restriction)}
                  />
                  <Label htmlFor={restriction} className="text-sm capitalize">
                    {restriction}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Eating Style */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Eating Style</Label>
            <Select
              value={preferences.eatingPreferences.style}
              onValueChange={(value: "foodie" | "casual" | "efficient") => 
                updatePreference('eatingPreferences.style', value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="foodie">Foodie - Exploring unique dishes</SelectItem>
                <SelectItem value="casual">Casual - Easygoing meals</SelectItem>
                <SelectItem value="efficient">Efficient - Quick bites</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transport Modes */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Preferred Transportation</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'walking' as const, label: 'Walking' },
                { key: 'public_transit' as const, label: 'Public Transit' },
                { key: 'taxi' as const, label: 'Taxi/Rideshare' }
              ].map(transport => (
                <div key={transport.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={transport.key}
                    checked={preferences.mobilityPreferences.transportModes.includes(transport.key)}
                    onCheckedChange={() => toggleTransportMode(transport.key)}
                  />
                  <Label htmlFor={transport.key} className="text-sm">
                    {transport.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Planning Style */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Planning Style</Label>
            <Select
              value={preferences.tripPreferences.planningStyle}
              onValueChange={(value: "structured" | "flexible") => 
                updatePreference('tripPreferences.planningStyle', value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="structured">Structured - Everything planned</SelectItem>
                <SelectItem value="flexible">Flexible - Spontaneous approach</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Accessibility */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="wheelchair"
                checked={preferences.mobilityPreferences.wheelchairAccessible}
                onCheckedChange={(checked) => 
                  updatePreference('mobilityPreferences.wheelchairAccessible', checked)
                }
              />
              <Label htmlFor="wheelchair" className="text-sm">
                Wheelchair accessibility required
              </Label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          {saveSuccess && (
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <Check className="w-4 h-4" />
              Preferences saved!
            </div>
          )}
          <Button
            onClick={savePreferences}
            disabled={!hasUnsavedChanges}
            className="gap-2"
          >
            {hasUnsavedChanges ? 'Save Changes' : 'Saved'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}