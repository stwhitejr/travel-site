export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json | undefined}
  | Json[];

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '12.2.3 (519615d)';
  };
  public: {
    Tables: {
      location: {
        Row: {
          address: string | null;
          sort_index: number | null;
          coordinates: [number, number] | null;
          description: string | null;
          id: number;
          title: string;
        };
        Insert: {
          address?: string | null;
          sort_index?: number | null;
          coordinates?: [number, number] | null;
          description?: string | null;
          id?: number;
          title: string;
        };
        Update: {
          address?: string | null;
          sort_index?: number | null;
          coordinates?: [number, number] | null;
          description?: string | null;
          id?: number;
          title?: string;
        };
        Relationships: [];
      };
      photo_metadata: {
        Row: {
          camera: string | null;
          blur: string | null;
          date: {
            day: number;
            hour: number;
            month: number;
            year: number;
            rawValue: string;
          } | null;
          file_name: string;
          height: number | null;
          id: number;
          location_id: number;
          orientation: string | null;
          rating: number | null;
          width: number | null;
        };
        Insert: {
          camera?: string | null;
          date?: string | null;
          file_name: string;
          height?: number | null;
          id?: number;
          location_id: number;
          orientation?: string | null;
          rating?: number | null;
          width?: number | null;
        };
        Update: {
          camera?: string | null;
          date?: string | null;
          file_name?: string;
          height?: number | null;
          id?: number;
          location_id?: number;
          orientation?: string | null;
          rating?: number | null;
          width?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'photoMetadata_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'location';
            referencedColumns: ['id'];
          }
        ];
      };
      photo_tags: {
        Row: {
          photo_id: number;
          tag_id: number;
        };
        Insert: {
          photo_id: number;
          tag_id: number;
        };
        Update: {
          photo_id?: number;
          tag_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'photo_tags_photo_id_fkey';
            columns: ['photo_id'];
            isOneToOne: false;
            referencedRelation: 'photo_metadata';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'photo_tags_photo_id_fkey';
            columns: ['photo_id'];
            isOneToOne: false;
            referencedRelation: 'top_rated_photo_per_tag';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'photo_tags_tag_id_fkey';
            columns: ['tag_id'];
            isOneToOne: false;
            referencedRelation: 'tags';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'photo_tags_tag_id_fkey';
            columns: ['tag_id'];
            isOneToOne: false;
            referencedRelation: 'top_rated_photo_per_tag';
            referencedColumns: ['tag_id'];
          }
        ];
      };
      tags: {
        Row: {
          id: number;
          name: string;
          description: string;
        };
        Insert: {
          id?: number;
          name: string;
          description: string;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      top_rated_photo_per_tag: {
        Row: {
          camera: string | null;
          blur: string | null;
          date: {
            day: number;
            hour: number;
            month: number;
            year: number;
            rawValue: string;
          } | null;
          file_name: string | null;
          height: number | null;
          id: number | null;
          location_id: number | null;
          orientation: string | null;
          rating: number | null;
          tag_id: number | null;
          tag_name: string | null;
          tag_description: string | null;
          width: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'photoMetadata_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'location';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | {schema: keyof DatabaseWithoutInternals},
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
      DefaultSchema['Views'])
  ? (DefaultSchema['Tables'] &
      DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | {schema: keyof DatabaseWithoutInternals},
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | {schema: keyof DatabaseWithoutInternals},
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | {schema: keyof DatabaseWithoutInternals},
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
  ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | {schema: keyof DatabaseWithoutInternals},
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
  ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
