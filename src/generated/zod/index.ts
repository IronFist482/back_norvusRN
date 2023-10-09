import { z } from "zod";
import type { Prisma } from "@prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const CuentaScalarFieldEnumSchema = z.enum([
  "id_cue",
  "cor_cue",
  "con_cue",
  "pre_cue",
  "nic_cue",
]);

export const RolScalarFieldEnumSchema = z.enum(["id_rol", "nom_rol"]);

export const UsuarioScalarFieldEnumSchema = z.enum([
  "id_usu",
  "nom_usu",
  "tel_usu",
  "id_rol",
  "id_cuenta",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CUENTA
//------------------------------------------------------

export const CuentaIncludeSchema: z.ZodType<Prisma.CuentaInclude> = z
  .object({
    usuario: z.union([z.boolean(), z.lazy(() => UsuarioArgsSchema)]).optional(),
  })
  .strict();

export const CuentaArgsSchema: z.ZodType<Prisma.CuentaDefaultArgs> = z
  .object({
    select: z.lazy(() => CuentaSelectSchema).optional(),
    include: z.lazy(() => CuentaIncludeSchema).optional(),
  })
  .strict();

export const CuentaSelectSchema: z.ZodType<Prisma.CuentaSelect> = z
  .object({
    id_cue: z.boolean().optional(),
    cor_cue: z.boolean().optional(),
    con_cue: z.boolean().optional(),
    pre_cue: z.boolean().optional(),
    nic_cue: z.boolean().optional(),
    usuario: z.union([z.boolean(), z.lazy(() => UsuarioArgsSchema)]).optional(),
  })
  .strict();

// ROL
//------------------------------------------------------

export const RolIncludeSchema: z.ZodType<Prisma.RolInclude> = z
  .object({
    usuario: z
      .union([z.boolean(), z.lazy(() => UsuarioFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => RolCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const RolArgsSchema: z.ZodType<Prisma.RolDefaultArgs> = z
  .object({
    select: z.lazy(() => RolSelectSchema).optional(),
    include: z.lazy(() => RolIncludeSchema).optional(),
  })
  .strict();

export const RolCountOutputTypeArgsSchema: z.ZodType<Prisma.RolCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => RolCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const RolCountOutputTypeSelectSchema: z.ZodType<Prisma.RolCountOutputTypeSelect> =
  z
    .object({
      usuario: z.boolean().optional(),
    })
    .strict();

export const RolSelectSchema: z.ZodType<Prisma.RolSelect> = z
  .object({
    id_rol: z.boolean().optional(),
    nom_rol: z.boolean().optional(),
    usuario: z
      .union([z.boolean(), z.lazy(() => UsuarioFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => RolCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// USUARIO
//------------------------------------------------------

export const UsuarioIncludeSchema: z.ZodType<Prisma.UsuarioInclude> = z
  .object({
    cuenta: z.union([z.boolean(), z.lazy(() => CuentaArgsSchema)]).optional(),
    rol: z.union([z.boolean(), z.lazy(() => RolArgsSchema)]).optional(),
  })
  .strict();

export const UsuarioArgsSchema: z.ZodType<Prisma.UsuarioDefaultArgs> = z
  .object({
    select: z.lazy(() => UsuarioSelectSchema).optional(),
    include: z.lazy(() => UsuarioIncludeSchema).optional(),
  })
  .strict();

export const UsuarioSelectSchema: z.ZodType<Prisma.UsuarioSelect> = z
  .object({
    id_usu: z.boolean().optional(),
    nom_usu: z.boolean().optional(),
    tel_usu: z.boolean().optional(),
    id_rol: z.boolean().optional(),
    id_cuenta: z.boolean().optional(),
    cuenta: z.union([z.boolean(), z.lazy(() => CuentaArgsSchema)]).optional(),
    rol: z.union([z.boolean(), z.lazy(() => RolArgsSchema)]).optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const CuentaWhereInputSchema: z.ZodType<Prisma.CuentaWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CuentaWhereInputSchema),
        z.lazy(() => CuentaWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CuentaWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CuentaWhereInputSchema),
        z.lazy(() => CuentaWhereInputSchema).array(),
      ])
      .optional(),
    id_cue: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    cor_cue: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    con_cue: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    pre_cue: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    nic_cue: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    usuario: z
      .union([
        z.lazy(() => UsuarioNullableRelationFilterSchema),
        z.lazy(() => UsuarioWhereInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const CuentaOrderByWithRelationInputSchema: z.ZodType<Prisma.CuentaOrderByWithRelationInput> =
  z
    .object({
      id_cue: z.lazy(() => SortOrderSchema).optional(),
      cor_cue: z.lazy(() => SortOrderSchema).optional(),
      con_cue: z.lazy(() => SortOrderSchema).optional(),
      pre_cue: z.lazy(() => SortOrderSchema).optional(),
      nic_cue: z.lazy(() => SortOrderSchema).optional(),
      usuario: z.lazy(() => UsuarioOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const CuentaWhereUniqueInputSchema: z.ZodType<Prisma.CuentaWhereUniqueInput> =
  z
    .object({
      id_cue: z.number(),
    })
    .and(
      z
        .object({
          id_cue: z.number().optional(),
          AND: z
            .union([
              z.lazy(() => CuentaWhereInputSchema),
              z.lazy(() => CuentaWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => CuentaWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => CuentaWhereInputSchema),
              z.lazy(() => CuentaWhereInputSchema).array(),
            ])
            .optional(),
          cor_cue: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          con_cue: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          pre_cue: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
          nic_cue: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          usuario: z
            .union([
              z.lazy(() => UsuarioNullableRelationFilterSchema),
              z.lazy(() => UsuarioWhereInputSchema),
            ])
            .optional()
            .nullable(),
        })
        .strict()
    );

export const CuentaOrderByWithAggregationInputSchema: z.ZodType<Prisma.CuentaOrderByWithAggregationInput> =
  z
    .object({
      id_cue: z.lazy(() => SortOrderSchema).optional(),
      cor_cue: z.lazy(() => SortOrderSchema).optional(),
      con_cue: z.lazy(() => SortOrderSchema).optional(),
      pre_cue: z.lazy(() => SortOrderSchema).optional(),
      nic_cue: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => CuentaCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => CuentaAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => CuentaMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => CuentaMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => CuentaSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const CuentaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CuentaScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => CuentaScalarWhereWithAggregatesInputSchema),
          z.lazy(() => CuentaScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => CuentaScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => CuentaScalarWhereWithAggregatesInputSchema),
          z.lazy(() => CuentaScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id_cue: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      cor_cue: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      con_cue: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      pre_cue: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      nic_cue: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const RolWhereInputSchema: z.ZodType<Prisma.RolWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => RolWhereInputSchema),
        z.lazy(() => RolWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RolWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RolWhereInputSchema),
        z.lazy(() => RolWhereInputSchema).array(),
      ])
      .optional(),
    id_rol: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    nom_rol: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    usuario: z.lazy(() => UsuarioListRelationFilterSchema).optional(),
  })
  .strict();

export const RolOrderByWithRelationInputSchema: z.ZodType<Prisma.RolOrderByWithRelationInput> =
  z
    .object({
      id_rol: z.lazy(() => SortOrderSchema).optional(),
      nom_rol: z.lazy(() => SortOrderSchema).optional(),
      usuario: z
        .lazy(() => UsuarioOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const RolWhereUniqueInputSchema: z.ZodType<Prisma.RolWhereUniqueInput> =
  z
    .object({
      id_rol: z.number(),
    })
    .and(
      z
        .object({
          id_rol: z.number().optional(),
          AND: z
            .union([
              z.lazy(() => RolWhereInputSchema),
              z.lazy(() => RolWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => RolWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => RolWhereInputSchema),
              z.lazy(() => RolWhereInputSchema).array(),
            ])
            .optional(),
          nom_rol: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          usuario: z.lazy(() => UsuarioListRelationFilterSchema).optional(),
        })
        .strict()
    );

export const RolOrderByWithAggregationInputSchema: z.ZodType<Prisma.RolOrderByWithAggregationInput> =
  z
    .object({
      id_rol: z.lazy(() => SortOrderSchema).optional(),
      nom_rol: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => RolCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => RolAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => RolMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => RolMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => RolSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const RolScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RolScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => RolScalarWhereWithAggregatesInputSchema),
          z.lazy(() => RolScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => RolScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => RolScalarWhereWithAggregatesInputSchema),
          z.lazy(() => RolScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id_rol: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      nom_rol: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const UsuarioWhereInputSchema: z.ZodType<Prisma.UsuarioWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UsuarioWhereInputSchema),
        z.lazy(() => UsuarioWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UsuarioWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UsuarioWhereInputSchema),
        z.lazy(() => UsuarioWhereInputSchema).array(),
      ])
      .optional(),
    id_usu: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    nom_usu: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    tel_usu: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    id_rol: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    id_cuenta: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    cuenta: z
      .union([
        z.lazy(() => CuentaRelationFilterSchema),
        z.lazy(() => CuentaWhereInputSchema),
      ])
      .optional(),
    rol: z
      .union([
        z.lazy(() => RolRelationFilterSchema),
        z.lazy(() => RolWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const UsuarioOrderByWithRelationInputSchema: z.ZodType<Prisma.UsuarioOrderByWithRelationInput> =
  z
    .object({
      id_usu: z.lazy(() => SortOrderSchema).optional(),
      nom_usu: z.lazy(() => SortOrderSchema).optional(),
      tel_usu: z.lazy(() => SortOrderSchema).optional(),
      id_rol: z.lazy(() => SortOrderSchema).optional(),
      id_cuenta: z.lazy(() => SortOrderSchema).optional(),
      cuenta: z.lazy(() => CuentaOrderByWithRelationInputSchema).optional(),
      rol: z.lazy(() => RolOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const UsuarioWhereUniqueInputSchema: z.ZodType<Prisma.UsuarioWhereUniqueInput> =
  z
    .union([
      z.object({
        id_usu: z.number(),
        id_cuenta: z.number(),
      }),
      z.object({
        id_usu: z.number(),
      }),
      z.object({
        id_cuenta: z.number(),
      }),
    ])
    .and(
      z
        .object({
          id_usu: z.number().optional(),
          id_cuenta: z.number().optional(),
          AND: z
            .union([
              z.lazy(() => UsuarioWhereInputSchema),
              z.lazy(() => UsuarioWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UsuarioWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UsuarioWhereInputSchema),
              z.lazy(() => UsuarioWhereInputSchema).array(),
            ])
            .optional(),
          nom_usu: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          tel_usu: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          id_rol: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
          cuenta: z
            .union([
              z.lazy(() => CuentaRelationFilterSchema),
              z.lazy(() => CuentaWhereInputSchema),
            ])
            .optional(),
          rol: z
            .union([
              z.lazy(() => RolRelationFilterSchema),
              z.lazy(() => RolWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const UsuarioOrderByWithAggregationInputSchema: z.ZodType<Prisma.UsuarioOrderByWithAggregationInput> =
  z
    .object({
      id_usu: z.lazy(() => SortOrderSchema).optional(),
      nom_usu: z.lazy(() => SortOrderSchema).optional(),
      tel_usu: z.lazy(() => SortOrderSchema).optional(),
      id_rol: z.lazy(() => SortOrderSchema).optional(),
      id_cuenta: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => UsuarioCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => UsuarioAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => UsuarioMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UsuarioMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => UsuarioSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const UsuarioScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UsuarioScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UsuarioScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UsuarioScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UsuarioScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UsuarioScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UsuarioScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id_usu: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      nom_usu: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      tel_usu: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      id_rol: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      id_cuenta: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export const CuentaCreateInputSchema: z.ZodType<Prisma.CuentaCreateInput> = z
  .object({
    cor_cue: z.string(),
    con_cue: z.string(),
    pre_cue: z.number().optional(),
    nic_cue: z.string(),
    usuario: z
      .lazy(() => UsuarioCreateNestedOneWithoutCuentaInputSchema)
      .optional(),
  })
  .strict();

export const CuentaUncheckedCreateInputSchema: z.ZodType<Prisma.CuentaUncheckedCreateInput> =
  z
    .object({
      id_cue: z.number().optional(),
      cor_cue: z.string(),
      con_cue: z.string(),
      pre_cue: z.number().optional(),
      nic_cue: z.string(),
      usuario: z
        .lazy(() => UsuarioUncheckedCreateNestedOneWithoutCuentaInputSchema)
        .optional(),
    })
    .strict();

export const CuentaUpdateInputSchema: z.ZodType<Prisma.CuentaUpdateInput> = z
  .object({
    cor_cue: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    con_cue: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    pre_cue: z
      .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
      .optional(),
    nic_cue: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    usuario: z
      .lazy(() => UsuarioUpdateOneWithoutCuentaNestedInputSchema)
      .optional(),
  })
  .strict();

export const CuentaUncheckedUpdateInputSchema: z.ZodType<Prisma.CuentaUncheckedUpdateInput> =
  z
    .object({
      id_cue: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      cor_cue: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      con_cue: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      pre_cue: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      nic_cue: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      usuario: z
        .lazy(() => UsuarioUncheckedUpdateOneWithoutCuentaNestedInputSchema)
        .optional(),
    })
    .strict();

export const CuentaCreateManyInputSchema: z.ZodType<Prisma.CuentaCreateManyInput> =
  z
    .object({
      id_cue: z.number().optional(),
      cor_cue: z.string(),
      con_cue: z.string(),
      pre_cue: z.number().optional(),
      nic_cue: z.string(),
    })
    .strict();

export const CuentaUpdateManyMutationInputSchema: z.ZodType<Prisma.CuentaUpdateManyMutationInput> =
  z
    .object({
      cor_cue: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      con_cue: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      pre_cue: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      nic_cue: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const CuentaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CuentaUncheckedUpdateManyInput> =
  z
    .object({
      id_cue: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      cor_cue: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      con_cue: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      pre_cue: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      nic_cue: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RolCreateInputSchema: z.ZodType<Prisma.RolCreateInput> = z
  .object({
    nom_rol: z.string(),
    usuario: z
      .lazy(() => UsuarioCreateNestedManyWithoutRolInputSchema)
      .optional(),
  })
  .strict();

export const RolUncheckedCreateInputSchema: z.ZodType<Prisma.RolUncheckedCreateInput> =
  z
    .object({
      id_rol: z.number().optional(),
      nom_rol: z.string(),
      usuario: z
        .lazy(() => UsuarioUncheckedCreateNestedManyWithoutRolInputSchema)
        .optional(),
    })
    .strict();

export const RolUpdateInputSchema: z.ZodType<Prisma.RolUpdateInput> = z
  .object({
    nom_rol: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    usuario: z
      .lazy(() => UsuarioUpdateManyWithoutRolNestedInputSchema)
      .optional(),
  })
  .strict();

export const RolUncheckedUpdateInputSchema: z.ZodType<Prisma.RolUncheckedUpdateInput> =
  z
    .object({
      id_rol: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      nom_rol: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      usuario: z
        .lazy(() => UsuarioUncheckedUpdateManyWithoutRolNestedInputSchema)
        .optional(),
    })
    .strict();

export const RolCreateManyInputSchema: z.ZodType<Prisma.RolCreateManyInput> = z
  .object({
    id_rol: z.number().optional(),
    nom_rol: z.string(),
  })
  .strict();

export const RolUpdateManyMutationInputSchema: z.ZodType<Prisma.RolUpdateManyMutationInput> =
  z
    .object({
      nom_rol: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RolUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RolUncheckedUpdateManyInput> =
  z
    .object({
      id_rol: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      nom_rol: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UsuarioCreateInputSchema: z.ZodType<Prisma.UsuarioCreateInput> = z
  .object({
    nom_usu: z.string(),
    tel_usu: z.string(),
    cuenta: z.lazy(() => CuentaCreateNestedOneWithoutUsuarioInputSchema),
    rol: z.lazy(() => RolCreateNestedOneWithoutUsuarioInputSchema).optional(),
  })
  .strict();

export const UsuarioUncheckedCreateInputSchema: z.ZodType<Prisma.UsuarioUncheckedCreateInput> =
  z
    .object({
      id_usu: z.number().optional(),
      nom_usu: z.string(),
      tel_usu: z.string(),
      id_rol: z.number().optional(),
      id_cuenta: z.number(),
    })
    .strict();

export const UsuarioUpdateInputSchema: z.ZodType<Prisma.UsuarioUpdateInput> = z
  .object({
    nom_usu: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    tel_usu: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    cuenta: z
      .lazy(() => CuentaUpdateOneRequiredWithoutUsuarioNestedInputSchema)
      .optional(),
    rol: z
      .lazy(() => RolUpdateOneRequiredWithoutUsuarioNestedInputSchema)
      .optional(),
  })
  .strict();

export const UsuarioUncheckedUpdateInputSchema: z.ZodType<Prisma.UsuarioUncheckedUpdateInput> =
  z
    .object({
      id_usu: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      nom_usu: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tel_usu: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id_rol: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      id_cuenta: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
    })
    .strict();

export const UsuarioCreateManyInputSchema: z.ZodType<Prisma.UsuarioCreateManyInput> =
  z
    .object({
      id_usu: z.number().optional(),
      nom_usu: z.string(),
      tel_usu: z.string(),
      id_rol: z.number().optional(),
      id_cuenta: z.number(),
    })
    .strict();

export const UsuarioUpdateManyMutationInputSchema: z.ZodType<Prisma.UsuarioUpdateManyMutationInput> =
  z
    .object({
      nom_usu: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tel_usu: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UsuarioUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UsuarioUncheckedUpdateManyInput> =
  z
    .object({
      id_usu: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      nom_usu: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tel_usu: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id_rol: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      id_cuenta: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
    })
    .strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const UsuarioNullableRelationFilterSchema: z.ZodType<Prisma.UsuarioNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => UsuarioWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => UsuarioWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const CuentaCountOrderByAggregateInputSchema: z.ZodType<Prisma.CuentaCountOrderByAggregateInput> =
  z
    .object({
      id_cue: z.lazy(() => SortOrderSchema).optional(),
      cor_cue: z.lazy(() => SortOrderSchema).optional(),
      con_cue: z.lazy(() => SortOrderSchema).optional(),
      pre_cue: z.lazy(() => SortOrderSchema).optional(),
      nic_cue: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const CuentaAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CuentaAvgOrderByAggregateInput> =
  z
    .object({
      id_cue: z.lazy(() => SortOrderSchema).optional(),
      pre_cue: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const CuentaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CuentaMaxOrderByAggregateInput> =
  z
    .object({
      id_cue: z.lazy(() => SortOrderSchema).optional(),
      cor_cue: z.lazy(() => SortOrderSchema).optional(),
      con_cue: z.lazy(() => SortOrderSchema).optional(),
      pre_cue: z.lazy(() => SortOrderSchema).optional(),
      nic_cue: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const CuentaMinOrderByAggregateInputSchema: z.ZodType<Prisma.CuentaMinOrderByAggregateInput> =
  z
    .object({
      id_cue: z.lazy(() => SortOrderSchema).optional(),
      cor_cue: z.lazy(() => SortOrderSchema).optional(),
      con_cue: z.lazy(() => SortOrderSchema).optional(),
      pre_cue: z.lazy(() => SortOrderSchema).optional(),
      nic_cue: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const CuentaSumOrderByAggregateInputSchema: z.ZodType<Prisma.CuentaSumOrderByAggregateInput> =
  z
    .object({
      id_cue: z.lazy(() => SortOrderSchema).optional(),
      pre_cue: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const UsuarioListRelationFilterSchema: z.ZodType<Prisma.UsuarioListRelationFilter> =
  z
    .object({
      every: z.lazy(() => UsuarioWhereInputSchema).optional(),
      some: z.lazy(() => UsuarioWhereInputSchema).optional(),
      none: z.lazy(() => UsuarioWhereInputSchema).optional(),
    })
    .strict();

export const UsuarioOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UsuarioOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RolCountOrderByAggregateInputSchema: z.ZodType<Prisma.RolCountOrderByAggregateInput> =
  z
    .object({
      id_rol: z.lazy(() => SortOrderSchema).optional(),
      nom_rol: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RolAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RolAvgOrderByAggregateInput> =
  z
    .object({
      id_rol: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RolMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RolMaxOrderByAggregateInput> =
  z
    .object({
      id_rol: z.lazy(() => SortOrderSchema).optional(),
      nom_rol: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RolMinOrderByAggregateInputSchema: z.ZodType<Prisma.RolMinOrderByAggregateInput> =
  z
    .object({
      id_rol: z.lazy(() => SortOrderSchema).optional(),
      nom_rol: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RolSumOrderByAggregateInputSchema: z.ZodType<Prisma.RolSumOrderByAggregateInput> =
  z
    .object({
      id_rol: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const CuentaRelationFilterSchema: z.ZodType<Prisma.CuentaRelationFilter> =
  z
    .object({
      is: z.lazy(() => CuentaWhereInputSchema).optional(),
      isNot: z.lazy(() => CuentaWhereInputSchema).optional(),
    })
    .strict();

export const RolRelationFilterSchema: z.ZodType<Prisma.RolRelationFilter> = z
  .object({
    is: z.lazy(() => RolWhereInputSchema).optional(),
    isNot: z.lazy(() => RolWhereInputSchema).optional(),
  })
  .strict();

export const UsuarioCountOrderByAggregateInputSchema: z.ZodType<Prisma.UsuarioCountOrderByAggregateInput> =
  z
    .object({
      id_usu: z.lazy(() => SortOrderSchema).optional(),
      nom_usu: z.lazy(() => SortOrderSchema).optional(),
      tel_usu: z.lazy(() => SortOrderSchema).optional(),
      id_rol: z.lazy(() => SortOrderSchema).optional(),
      id_cuenta: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UsuarioAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UsuarioAvgOrderByAggregateInput> =
  z
    .object({
      id_usu: z.lazy(() => SortOrderSchema).optional(),
      id_rol: z.lazy(() => SortOrderSchema).optional(),
      id_cuenta: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UsuarioMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsuarioMaxOrderByAggregateInput> =
  z
    .object({
      id_usu: z.lazy(() => SortOrderSchema).optional(),
      nom_usu: z.lazy(() => SortOrderSchema).optional(),
      tel_usu: z.lazy(() => SortOrderSchema).optional(),
      id_rol: z.lazy(() => SortOrderSchema).optional(),
      id_cuenta: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UsuarioMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsuarioMinOrderByAggregateInput> =
  z
    .object({
      id_usu: z.lazy(() => SortOrderSchema).optional(),
      nom_usu: z.lazy(() => SortOrderSchema).optional(),
      tel_usu: z.lazy(() => SortOrderSchema).optional(),
      id_rol: z.lazy(() => SortOrderSchema).optional(),
      id_cuenta: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UsuarioSumOrderByAggregateInputSchema: z.ZodType<Prisma.UsuarioSumOrderByAggregateInput> =
  z
    .object({
      id_usu: z.lazy(() => SortOrderSchema).optional(),
      id_rol: z.lazy(() => SortOrderSchema).optional(),
      id_cuenta: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UsuarioCreateNestedOneWithoutCuentaInputSchema: z.ZodType<Prisma.UsuarioCreateNestedOneWithoutCuentaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UsuarioCreateWithoutCuentaInputSchema),
          z.lazy(() => UsuarioUncheckedCreateWithoutCuentaInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UsuarioCreateOrConnectWithoutCuentaInputSchema)
        .optional(),
      connect: z.lazy(() => UsuarioWhereUniqueInputSchema).optional(),
    })
    .strict();

export const UsuarioUncheckedCreateNestedOneWithoutCuentaInputSchema: z.ZodType<Prisma.UsuarioUncheckedCreateNestedOneWithoutCuentaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UsuarioCreateWithoutCuentaInputSchema),
          z.lazy(() => UsuarioUncheckedCreateWithoutCuentaInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UsuarioCreateOrConnectWithoutCuentaInputSchema)
        .optional(),
      connect: z.lazy(() => UsuarioWhereUniqueInputSchema).optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const UsuarioUpdateOneWithoutCuentaNestedInputSchema: z.ZodType<Prisma.UsuarioUpdateOneWithoutCuentaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UsuarioCreateWithoutCuentaInputSchema),
          z.lazy(() => UsuarioUncheckedCreateWithoutCuentaInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UsuarioCreateOrConnectWithoutCuentaInputSchema)
        .optional(),
      upsert: z.lazy(() => UsuarioUpsertWithoutCuentaInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => UsuarioWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => UsuarioWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => UsuarioWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UsuarioUpdateToOneWithWhereWithoutCuentaInputSchema),
          z.lazy(() => UsuarioUpdateWithoutCuentaInputSchema),
          z.lazy(() => UsuarioUncheckedUpdateWithoutCuentaInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UsuarioUncheckedUpdateOneWithoutCuentaNestedInputSchema: z.ZodType<Prisma.UsuarioUncheckedUpdateOneWithoutCuentaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UsuarioCreateWithoutCuentaInputSchema),
          z.lazy(() => UsuarioUncheckedCreateWithoutCuentaInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UsuarioCreateOrConnectWithoutCuentaInputSchema)
        .optional(),
      upsert: z.lazy(() => UsuarioUpsertWithoutCuentaInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => UsuarioWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => UsuarioWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => UsuarioWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UsuarioUpdateToOneWithWhereWithoutCuentaInputSchema),
          z.lazy(() => UsuarioUpdateWithoutCuentaInputSchema),
          z.lazy(() => UsuarioUncheckedUpdateWithoutCuentaInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UsuarioCreateNestedManyWithoutRolInputSchema: z.ZodType<Prisma.UsuarioCreateNestedManyWithoutRolInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UsuarioCreateWithoutRolInputSchema),
          z.lazy(() => UsuarioCreateWithoutRolInputSchema).array(),
          z.lazy(() => UsuarioUncheckedCreateWithoutRolInputSchema),
          z.lazy(() => UsuarioUncheckedCreateWithoutRolInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UsuarioCreateOrConnectWithoutRolInputSchema),
          z.lazy(() => UsuarioCreateOrConnectWithoutRolInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UsuarioCreateManyRolInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => UsuarioWhereUniqueInputSchema),
          z.lazy(() => UsuarioWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UsuarioUncheckedCreateNestedManyWithoutRolInputSchema: z.ZodType<Prisma.UsuarioUncheckedCreateNestedManyWithoutRolInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UsuarioCreateWithoutRolInputSchema),
          z.lazy(() => UsuarioCreateWithoutRolInputSchema).array(),
          z.lazy(() => UsuarioUncheckedCreateWithoutRolInputSchema),
          z.lazy(() => UsuarioUncheckedCreateWithoutRolInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UsuarioCreateOrConnectWithoutRolInputSchema),
          z.lazy(() => UsuarioCreateOrConnectWithoutRolInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UsuarioCreateManyRolInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => UsuarioWhereUniqueInputSchema),
          z.lazy(() => UsuarioWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UsuarioUpdateManyWithoutRolNestedInputSchema: z.ZodType<Prisma.UsuarioUpdateManyWithoutRolNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UsuarioCreateWithoutRolInputSchema),
          z.lazy(() => UsuarioCreateWithoutRolInputSchema).array(),
          z.lazy(() => UsuarioUncheckedCreateWithoutRolInputSchema),
          z.lazy(() => UsuarioUncheckedCreateWithoutRolInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UsuarioCreateOrConnectWithoutRolInputSchema),
          z.lazy(() => UsuarioCreateOrConnectWithoutRolInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UsuarioUpsertWithWhereUniqueWithoutRolInputSchema),
          z
            .lazy(() => UsuarioUpsertWithWhereUniqueWithoutRolInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UsuarioCreateManyRolInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => UsuarioWhereUniqueInputSchema),
          z.lazy(() => UsuarioWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UsuarioWhereUniqueInputSchema),
          z.lazy(() => UsuarioWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UsuarioWhereUniqueInputSchema),
          z.lazy(() => UsuarioWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UsuarioWhereUniqueInputSchema),
          z.lazy(() => UsuarioWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UsuarioUpdateWithWhereUniqueWithoutRolInputSchema),
          z
            .lazy(() => UsuarioUpdateWithWhereUniqueWithoutRolInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UsuarioUpdateManyWithWhereWithoutRolInputSchema),
          z.lazy(() => UsuarioUpdateManyWithWhereWithoutRolInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UsuarioScalarWhereInputSchema),
          z.lazy(() => UsuarioScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UsuarioUncheckedUpdateManyWithoutRolNestedInputSchema: z.ZodType<Prisma.UsuarioUncheckedUpdateManyWithoutRolNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UsuarioCreateWithoutRolInputSchema),
          z.lazy(() => UsuarioCreateWithoutRolInputSchema).array(),
          z.lazy(() => UsuarioUncheckedCreateWithoutRolInputSchema),
          z.lazy(() => UsuarioUncheckedCreateWithoutRolInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UsuarioCreateOrConnectWithoutRolInputSchema),
          z.lazy(() => UsuarioCreateOrConnectWithoutRolInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UsuarioUpsertWithWhereUniqueWithoutRolInputSchema),
          z
            .lazy(() => UsuarioUpsertWithWhereUniqueWithoutRolInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UsuarioCreateManyRolInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => UsuarioWhereUniqueInputSchema),
          z.lazy(() => UsuarioWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UsuarioWhereUniqueInputSchema),
          z.lazy(() => UsuarioWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UsuarioWhereUniqueInputSchema),
          z.lazy(() => UsuarioWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UsuarioWhereUniqueInputSchema),
          z.lazy(() => UsuarioWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UsuarioUpdateWithWhereUniqueWithoutRolInputSchema),
          z
            .lazy(() => UsuarioUpdateWithWhereUniqueWithoutRolInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UsuarioUpdateManyWithWhereWithoutRolInputSchema),
          z.lazy(() => UsuarioUpdateManyWithWhereWithoutRolInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UsuarioScalarWhereInputSchema),
          z.lazy(() => UsuarioScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CuentaCreateNestedOneWithoutUsuarioInputSchema: z.ZodType<Prisma.CuentaCreateNestedOneWithoutUsuarioInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CuentaCreateWithoutUsuarioInputSchema),
          z.lazy(() => CuentaUncheckedCreateWithoutUsuarioInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => CuentaCreateOrConnectWithoutUsuarioInputSchema)
        .optional(),
      connect: z.lazy(() => CuentaWhereUniqueInputSchema).optional(),
    })
    .strict();

export const RolCreateNestedOneWithoutUsuarioInputSchema: z.ZodType<Prisma.RolCreateNestedOneWithoutUsuarioInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RolCreateWithoutUsuarioInputSchema),
          z.lazy(() => RolUncheckedCreateWithoutUsuarioInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => RolCreateOrConnectWithoutUsuarioInputSchema)
        .optional(),
      connect: z.lazy(() => RolWhereUniqueInputSchema).optional(),
    })
    .strict();

export const CuentaUpdateOneRequiredWithoutUsuarioNestedInputSchema: z.ZodType<Prisma.CuentaUpdateOneRequiredWithoutUsuarioNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CuentaCreateWithoutUsuarioInputSchema),
          z.lazy(() => CuentaUncheckedCreateWithoutUsuarioInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => CuentaCreateOrConnectWithoutUsuarioInputSchema)
        .optional(),
      upsert: z.lazy(() => CuentaUpsertWithoutUsuarioInputSchema).optional(),
      connect: z.lazy(() => CuentaWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => CuentaUpdateToOneWithWhereWithoutUsuarioInputSchema),
          z.lazy(() => CuentaUpdateWithoutUsuarioInputSchema),
          z.lazy(() => CuentaUncheckedUpdateWithoutUsuarioInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RolUpdateOneRequiredWithoutUsuarioNestedInputSchema: z.ZodType<Prisma.RolUpdateOneRequiredWithoutUsuarioNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RolCreateWithoutUsuarioInputSchema),
          z.lazy(() => RolUncheckedCreateWithoutUsuarioInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => RolCreateOrConnectWithoutUsuarioInputSchema)
        .optional(),
      upsert: z.lazy(() => RolUpsertWithoutUsuarioInputSchema).optional(),
      connect: z.lazy(() => RolWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => RolUpdateToOneWithWhereWithoutUsuarioInputSchema),
          z.lazy(() => RolUpdateWithoutUsuarioInputSchema),
          z.lazy(() => RolUncheckedUpdateWithoutUsuarioInputSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const UsuarioCreateWithoutCuentaInputSchema: z.ZodType<Prisma.UsuarioCreateWithoutCuentaInput> =
  z
    .object({
      nom_usu: z.string(),
      tel_usu: z.string(),
      rol: z.lazy(() => RolCreateNestedOneWithoutUsuarioInputSchema).optional(),
    })
    .strict();

export const UsuarioUncheckedCreateWithoutCuentaInputSchema: z.ZodType<Prisma.UsuarioUncheckedCreateWithoutCuentaInput> =
  z
    .object({
      id_usu: z.number().optional(),
      nom_usu: z.string(),
      tel_usu: z.string(),
      id_rol: z.number().optional(),
    })
    .strict();

export const UsuarioCreateOrConnectWithoutCuentaInputSchema: z.ZodType<Prisma.UsuarioCreateOrConnectWithoutCuentaInput> =
  z
    .object({
      where: z.lazy(() => UsuarioWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UsuarioCreateWithoutCuentaInputSchema),
        z.lazy(() => UsuarioUncheckedCreateWithoutCuentaInputSchema),
      ]),
    })
    .strict();

export const UsuarioUpsertWithoutCuentaInputSchema: z.ZodType<Prisma.UsuarioUpsertWithoutCuentaInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UsuarioUpdateWithoutCuentaInputSchema),
        z.lazy(() => UsuarioUncheckedUpdateWithoutCuentaInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UsuarioCreateWithoutCuentaInputSchema),
        z.lazy(() => UsuarioUncheckedCreateWithoutCuentaInputSchema),
      ]),
      where: z.lazy(() => UsuarioWhereInputSchema).optional(),
    })
    .strict();

export const UsuarioUpdateToOneWithWhereWithoutCuentaInputSchema: z.ZodType<Prisma.UsuarioUpdateToOneWithWhereWithoutCuentaInput> =
  z
    .object({
      where: z.lazy(() => UsuarioWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UsuarioUpdateWithoutCuentaInputSchema),
        z.lazy(() => UsuarioUncheckedUpdateWithoutCuentaInputSchema),
      ]),
    })
    .strict();

export const UsuarioUpdateWithoutCuentaInputSchema: z.ZodType<Prisma.UsuarioUpdateWithoutCuentaInput> =
  z
    .object({
      nom_usu: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tel_usu: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rol: z
        .lazy(() => RolUpdateOneRequiredWithoutUsuarioNestedInputSchema)
        .optional(),
    })
    .strict();

export const UsuarioUncheckedUpdateWithoutCuentaInputSchema: z.ZodType<Prisma.UsuarioUncheckedUpdateWithoutCuentaInput> =
  z
    .object({
      id_usu: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      nom_usu: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tel_usu: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id_rol: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
    })
    .strict();

export const UsuarioCreateWithoutRolInputSchema: z.ZodType<Prisma.UsuarioCreateWithoutRolInput> =
  z
    .object({
      nom_usu: z.string(),
      tel_usu: z.string(),
      cuenta: z.lazy(() => CuentaCreateNestedOneWithoutUsuarioInputSchema),
    })
    .strict();

export const UsuarioUncheckedCreateWithoutRolInputSchema: z.ZodType<Prisma.UsuarioUncheckedCreateWithoutRolInput> =
  z
    .object({
      id_usu: z.number().optional(),
      nom_usu: z.string(),
      tel_usu: z.string(),
      id_cuenta: z.number(),
    })
    .strict();

export const UsuarioCreateOrConnectWithoutRolInputSchema: z.ZodType<Prisma.UsuarioCreateOrConnectWithoutRolInput> =
  z
    .object({
      where: z.lazy(() => UsuarioWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UsuarioCreateWithoutRolInputSchema),
        z.lazy(() => UsuarioUncheckedCreateWithoutRolInputSchema),
      ]),
    })
    .strict();

export const UsuarioCreateManyRolInputEnvelopeSchema: z.ZodType<Prisma.UsuarioCreateManyRolInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => UsuarioCreateManyRolInputSchema),
        z.lazy(() => UsuarioCreateManyRolInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UsuarioUpsertWithWhereUniqueWithoutRolInputSchema: z.ZodType<Prisma.UsuarioUpsertWithWhereUniqueWithoutRolInput> =
  z
    .object({
      where: z.lazy(() => UsuarioWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => UsuarioUpdateWithoutRolInputSchema),
        z.lazy(() => UsuarioUncheckedUpdateWithoutRolInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UsuarioCreateWithoutRolInputSchema),
        z.lazy(() => UsuarioUncheckedCreateWithoutRolInputSchema),
      ]),
    })
    .strict();

export const UsuarioUpdateWithWhereUniqueWithoutRolInputSchema: z.ZodType<Prisma.UsuarioUpdateWithWhereUniqueWithoutRolInput> =
  z
    .object({
      where: z.lazy(() => UsuarioWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => UsuarioUpdateWithoutRolInputSchema),
        z.lazy(() => UsuarioUncheckedUpdateWithoutRolInputSchema),
      ]),
    })
    .strict();

export const UsuarioUpdateManyWithWhereWithoutRolInputSchema: z.ZodType<Prisma.UsuarioUpdateManyWithWhereWithoutRolInput> =
  z
    .object({
      where: z.lazy(() => UsuarioScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => UsuarioUpdateManyMutationInputSchema),
        z.lazy(() => UsuarioUncheckedUpdateManyWithoutRolInputSchema),
      ]),
    })
    .strict();

export const UsuarioScalarWhereInputSchema: z.ZodType<Prisma.UsuarioScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UsuarioScalarWhereInputSchema),
          z.lazy(() => UsuarioScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UsuarioScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UsuarioScalarWhereInputSchema),
          z.lazy(() => UsuarioScalarWhereInputSchema).array(),
        ])
        .optional(),
      id_usu: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      nom_usu: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      tel_usu: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      id_rol: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      id_cuenta: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export const CuentaCreateWithoutUsuarioInputSchema: z.ZodType<Prisma.CuentaCreateWithoutUsuarioInput> =
  z
    .object({
      cor_cue: z.string(),
      con_cue: z.string(),
      pre_cue: z.number().optional(),
      nic_cue: z.string(),
    })
    .strict();

export const CuentaUncheckedCreateWithoutUsuarioInputSchema: z.ZodType<Prisma.CuentaUncheckedCreateWithoutUsuarioInput> =
  z
    .object({
      id_cue: z.number().optional(),
      cor_cue: z.string(),
      con_cue: z.string(),
      pre_cue: z.number().optional(),
      nic_cue: z.string(),
    })
    .strict();

export const CuentaCreateOrConnectWithoutUsuarioInputSchema: z.ZodType<Prisma.CuentaCreateOrConnectWithoutUsuarioInput> =
  z
    .object({
      where: z.lazy(() => CuentaWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => CuentaCreateWithoutUsuarioInputSchema),
        z.lazy(() => CuentaUncheckedCreateWithoutUsuarioInputSchema),
      ]),
    })
    .strict();

export const RolCreateWithoutUsuarioInputSchema: z.ZodType<Prisma.RolCreateWithoutUsuarioInput> =
  z
    .object({
      nom_rol: z.string(),
    })
    .strict();

export const RolUncheckedCreateWithoutUsuarioInputSchema: z.ZodType<Prisma.RolUncheckedCreateWithoutUsuarioInput> =
  z
    .object({
      id_rol: z.number().optional(),
      nom_rol: z.string(),
    })
    .strict();

export const RolCreateOrConnectWithoutUsuarioInputSchema: z.ZodType<Prisma.RolCreateOrConnectWithoutUsuarioInput> =
  z
    .object({
      where: z.lazy(() => RolWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => RolCreateWithoutUsuarioInputSchema),
        z.lazy(() => RolUncheckedCreateWithoutUsuarioInputSchema),
      ]),
    })
    .strict();

export const CuentaUpsertWithoutUsuarioInputSchema: z.ZodType<Prisma.CuentaUpsertWithoutUsuarioInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => CuentaUpdateWithoutUsuarioInputSchema),
        z.lazy(() => CuentaUncheckedUpdateWithoutUsuarioInputSchema),
      ]),
      create: z.union([
        z.lazy(() => CuentaCreateWithoutUsuarioInputSchema),
        z.lazy(() => CuentaUncheckedCreateWithoutUsuarioInputSchema),
      ]),
      where: z.lazy(() => CuentaWhereInputSchema).optional(),
    })
    .strict();

export const CuentaUpdateToOneWithWhereWithoutUsuarioInputSchema: z.ZodType<Prisma.CuentaUpdateToOneWithWhereWithoutUsuarioInput> =
  z
    .object({
      where: z.lazy(() => CuentaWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => CuentaUpdateWithoutUsuarioInputSchema),
        z.lazy(() => CuentaUncheckedUpdateWithoutUsuarioInputSchema),
      ]),
    })
    .strict();

export const CuentaUpdateWithoutUsuarioInputSchema: z.ZodType<Prisma.CuentaUpdateWithoutUsuarioInput> =
  z
    .object({
      cor_cue: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      con_cue: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      pre_cue: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      nic_cue: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const CuentaUncheckedUpdateWithoutUsuarioInputSchema: z.ZodType<Prisma.CuentaUncheckedUpdateWithoutUsuarioInput> =
  z
    .object({
      id_cue: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      cor_cue: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      con_cue: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      pre_cue: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      nic_cue: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RolUpsertWithoutUsuarioInputSchema: z.ZodType<Prisma.RolUpsertWithoutUsuarioInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => RolUpdateWithoutUsuarioInputSchema),
        z.lazy(() => RolUncheckedUpdateWithoutUsuarioInputSchema),
      ]),
      create: z.union([
        z.lazy(() => RolCreateWithoutUsuarioInputSchema),
        z.lazy(() => RolUncheckedCreateWithoutUsuarioInputSchema),
      ]),
      where: z.lazy(() => RolWhereInputSchema).optional(),
    })
    .strict();

export const RolUpdateToOneWithWhereWithoutUsuarioInputSchema: z.ZodType<Prisma.RolUpdateToOneWithWhereWithoutUsuarioInput> =
  z
    .object({
      where: z.lazy(() => RolWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => RolUpdateWithoutUsuarioInputSchema),
        z.lazy(() => RolUncheckedUpdateWithoutUsuarioInputSchema),
      ]),
    })
    .strict();

export const RolUpdateWithoutUsuarioInputSchema: z.ZodType<Prisma.RolUpdateWithoutUsuarioInput> =
  z
    .object({
      nom_rol: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RolUncheckedUpdateWithoutUsuarioInputSchema: z.ZodType<Prisma.RolUncheckedUpdateWithoutUsuarioInput> =
  z
    .object({
      id_rol: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      nom_rol: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UsuarioCreateManyRolInputSchema: z.ZodType<Prisma.UsuarioCreateManyRolInput> =
  z
    .object({
      id_usu: z.number().optional(),
      nom_usu: z.string(),
      tel_usu: z.string(),
      id_cuenta: z.number(),
    })
    .strict();

export const UsuarioUpdateWithoutRolInputSchema: z.ZodType<Prisma.UsuarioUpdateWithoutRolInput> =
  z
    .object({
      nom_usu: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tel_usu: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      cuenta: z
        .lazy(() => CuentaUpdateOneRequiredWithoutUsuarioNestedInputSchema)
        .optional(),
    })
    .strict();

export const UsuarioUncheckedUpdateWithoutRolInputSchema: z.ZodType<Prisma.UsuarioUncheckedUpdateWithoutRolInput> =
  z
    .object({
      id_usu: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      nom_usu: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tel_usu: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id_cuenta: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
    })
    .strict();

export const UsuarioUncheckedUpdateManyWithoutRolInputSchema: z.ZodType<Prisma.UsuarioUncheckedUpdateManyWithoutRolInput> =
  z
    .object({
      id_usu: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      nom_usu: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tel_usu: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id_cuenta: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const CuentaFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.CuentaFindFirstArgs, "select" | "include">
> = z
  .object({
    where: CuentaWhereInputSchema.optional(),
    orderBy: z
      .union([
        CuentaOrderByWithRelationInputSchema.array(),
        CuentaOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: CuentaWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([CuentaScalarFieldEnumSchema, CuentaScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const CuentaFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.CuentaFindFirstOrThrowArgs, "select" | "include">
> = z
  .object({
    where: CuentaWhereInputSchema.optional(),
    orderBy: z
      .union([
        CuentaOrderByWithRelationInputSchema.array(),
        CuentaOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: CuentaWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([CuentaScalarFieldEnumSchema, CuentaScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const CuentaFindManyArgsSchema: z.ZodType<
  Omit<Prisma.CuentaFindManyArgs, "select" | "include">
> = z
  .object({
    where: CuentaWhereInputSchema.optional(),
    orderBy: z
      .union([
        CuentaOrderByWithRelationInputSchema.array(),
        CuentaOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: CuentaWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([CuentaScalarFieldEnumSchema, CuentaScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const CuentaAggregateArgsSchema: z.ZodType<Prisma.CuentaAggregateArgs> =
  z
    .object({
      where: CuentaWhereInputSchema.optional(),
      orderBy: z
        .union([
          CuentaOrderByWithRelationInputSchema.array(),
          CuentaOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CuentaWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const CuentaGroupByArgsSchema: z.ZodType<Prisma.CuentaGroupByArgs> = z
  .object({
    where: CuentaWhereInputSchema.optional(),
    orderBy: z
      .union([
        CuentaOrderByWithAggregationInputSchema.array(),
        CuentaOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: CuentaScalarFieldEnumSchema.array(),
    having: CuentaScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const CuentaFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.CuentaFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: CuentaWhereUniqueInputSchema,
  })
  .strict();

export const CuentaFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.CuentaFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: CuentaWhereUniqueInputSchema,
  })
  .strict();

export const RolFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.RolFindFirstArgs, "select" | "include">
> = z
  .object({
    where: RolWhereInputSchema.optional(),
    orderBy: z
      .union([
        RolOrderByWithRelationInputSchema.array(),
        RolOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: RolWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([RolScalarFieldEnumSchema, RolScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const RolFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.RolFindFirstOrThrowArgs, "select" | "include">
> = z
  .object({
    where: RolWhereInputSchema.optional(),
    orderBy: z
      .union([
        RolOrderByWithRelationInputSchema.array(),
        RolOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: RolWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([RolScalarFieldEnumSchema, RolScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const RolFindManyArgsSchema: z.ZodType<
  Omit<Prisma.RolFindManyArgs, "select" | "include">
> = z
  .object({
    where: RolWhereInputSchema.optional(),
    orderBy: z
      .union([
        RolOrderByWithRelationInputSchema.array(),
        RolOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: RolWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([RolScalarFieldEnumSchema, RolScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const RolAggregateArgsSchema: z.ZodType<Prisma.RolAggregateArgs> = z
  .object({
    where: RolWhereInputSchema.optional(),
    orderBy: z
      .union([
        RolOrderByWithRelationInputSchema.array(),
        RolOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: RolWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const RolGroupByArgsSchema: z.ZodType<Prisma.RolGroupByArgs> = z
  .object({
    where: RolWhereInputSchema.optional(),
    orderBy: z
      .union([
        RolOrderByWithAggregationInputSchema.array(),
        RolOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: RolScalarFieldEnumSchema.array(),
    having: RolScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const RolFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.RolFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: RolWhereUniqueInputSchema,
  })
  .strict();

export const RolFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.RolFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: RolWhereUniqueInputSchema,
  })
  .strict();

export const UsuarioFindFirstArgsSchema: z.ZodType<
  Omit<Prisma.UsuarioFindFirstArgs, "select" | "include">
> = z
  .object({
    where: UsuarioWhereInputSchema.optional(),
    orderBy: z
      .union([
        UsuarioOrderByWithRelationInputSchema.array(),
        UsuarioOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UsuarioWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        UsuarioScalarFieldEnumSchema,
        UsuarioScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const UsuarioFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.UsuarioFindFirstOrThrowArgs, "select" | "include">
> = z
  .object({
    where: UsuarioWhereInputSchema.optional(),
    orderBy: z
      .union([
        UsuarioOrderByWithRelationInputSchema.array(),
        UsuarioOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UsuarioWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        UsuarioScalarFieldEnumSchema,
        UsuarioScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const UsuarioFindManyArgsSchema: z.ZodType<
  Omit<Prisma.UsuarioFindManyArgs, "select" | "include">
> = z
  .object({
    where: UsuarioWhereInputSchema.optional(),
    orderBy: z
      .union([
        UsuarioOrderByWithRelationInputSchema.array(),
        UsuarioOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UsuarioWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        UsuarioScalarFieldEnumSchema,
        UsuarioScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export const UsuarioAggregateArgsSchema: z.ZodType<Prisma.UsuarioAggregateArgs> =
  z
    .object({
      where: UsuarioWhereInputSchema.optional(),
      orderBy: z
        .union([
          UsuarioOrderByWithRelationInputSchema.array(),
          UsuarioOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UsuarioWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const UsuarioGroupByArgsSchema: z.ZodType<Prisma.UsuarioGroupByArgs> = z
  .object({
    where: UsuarioWhereInputSchema.optional(),
    orderBy: z
      .union([
        UsuarioOrderByWithAggregationInputSchema.array(),
        UsuarioOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UsuarioScalarFieldEnumSchema.array(),
    having: UsuarioScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UsuarioFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.UsuarioFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: UsuarioWhereUniqueInputSchema,
  })
  .strict();

export const UsuarioFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.UsuarioFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: UsuarioWhereUniqueInputSchema,
  })
  .strict();

export const CuentaCreateArgsSchema: z.ZodType<
  Omit<Prisma.CuentaCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([CuentaCreateInputSchema, CuentaUncheckedCreateInputSchema]),
  })
  .strict();

export const CuentaUpsertArgsSchema: z.ZodType<
  Omit<Prisma.CuentaUpsertArgs, "select" | "include">
> = z
  .object({
    where: CuentaWhereUniqueInputSchema,
    create: z.union([
      CuentaCreateInputSchema,
      CuentaUncheckedCreateInputSchema,
    ]),
    update: z.union([
      CuentaUpdateInputSchema,
      CuentaUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const CuentaCreateManyArgsSchema: z.ZodType<Prisma.CuentaCreateManyArgs> =
  z
    .object({
      data: z.union([
        CuentaCreateManyInputSchema,
        CuentaCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const CuentaDeleteArgsSchema: z.ZodType<
  Omit<Prisma.CuentaDeleteArgs, "select" | "include">
> = z
  .object({
    where: CuentaWhereUniqueInputSchema,
  })
  .strict();

export const CuentaUpdateArgsSchema: z.ZodType<
  Omit<Prisma.CuentaUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([CuentaUpdateInputSchema, CuentaUncheckedUpdateInputSchema]),
    where: CuentaWhereUniqueInputSchema,
  })
  .strict();

export const CuentaUpdateManyArgsSchema: z.ZodType<Prisma.CuentaUpdateManyArgs> =
  z
    .object({
      data: z.union([
        CuentaUpdateManyMutationInputSchema,
        CuentaUncheckedUpdateManyInputSchema,
      ]),
      where: CuentaWhereInputSchema.optional(),
    })
    .strict();

export const CuentaDeleteManyArgsSchema: z.ZodType<Prisma.CuentaDeleteManyArgs> =
  z
    .object({
      where: CuentaWhereInputSchema.optional(),
    })
    .strict();

export const RolCreateArgsSchema: z.ZodType<
  Omit<Prisma.RolCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([RolCreateInputSchema, RolUncheckedCreateInputSchema]),
  })
  .strict();

export const RolUpsertArgsSchema: z.ZodType<
  Omit<Prisma.RolUpsertArgs, "select" | "include">
> = z
  .object({
    where: RolWhereUniqueInputSchema,
    create: z.union([RolCreateInputSchema, RolUncheckedCreateInputSchema]),
    update: z.union([RolUpdateInputSchema, RolUncheckedUpdateInputSchema]),
  })
  .strict();

export const RolCreateManyArgsSchema: z.ZodType<Prisma.RolCreateManyArgs> = z
  .object({
    data: z.union([RolCreateManyInputSchema, RolCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const RolDeleteArgsSchema: z.ZodType<
  Omit<Prisma.RolDeleteArgs, "select" | "include">
> = z
  .object({
    where: RolWhereUniqueInputSchema,
  })
  .strict();

export const RolUpdateArgsSchema: z.ZodType<
  Omit<Prisma.RolUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([RolUpdateInputSchema, RolUncheckedUpdateInputSchema]),
    where: RolWhereUniqueInputSchema,
  })
  .strict();

export const RolUpdateManyArgsSchema: z.ZodType<Prisma.RolUpdateManyArgs> = z
  .object({
    data: z.union([
      RolUpdateManyMutationInputSchema,
      RolUncheckedUpdateManyInputSchema,
    ]),
    where: RolWhereInputSchema.optional(),
  })
  .strict();

export const RolDeleteManyArgsSchema: z.ZodType<Prisma.RolDeleteManyArgs> = z
  .object({
    where: RolWhereInputSchema.optional(),
  })
  .strict();

export const UsuarioCreateArgsSchema: z.ZodType<
  Omit<Prisma.UsuarioCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      UsuarioCreateInputSchema,
      UsuarioUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const UsuarioUpsertArgsSchema: z.ZodType<
  Omit<Prisma.UsuarioUpsertArgs, "select" | "include">
> = z
  .object({
    where: UsuarioWhereUniqueInputSchema,
    create: z.union([
      UsuarioCreateInputSchema,
      UsuarioUncheckedCreateInputSchema,
    ]),
    update: z.union([
      UsuarioUpdateInputSchema,
      UsuarioUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const UsuarioCreateManyArgsSchema: z.ZodType<Prisma.UsuarioCreateManyArgs> =
  z
    .object({
      data: z.union([
        UsuarioCreateManyInputSchema,
        UsuarioCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UsuarioDeleteArgsSchema: z.ZodType<
  Omit<Prisma.UsuarioDeleteArgs, "select" | "include">
> = z
  .object({
    where: UsuarioWhereUniqueInputSchema,
  })
  .strict();

export const UsuarioUpdateArgsSchema: z.ZodType<
  Omit<Prisma.UsuarioUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      UsuarioUpdateInputSchema,
      UsuarioUncheckedUpdateInputSchema,
    ]),
    where: UsuarioWhereUniqueInputSchema,
  })
  .strict();

export const UsuarioUpdateManyArgsSchema: z.ZodType<Prisma.UsuarioUpdateManyArgs> =
  z
    .object({
      data: z.union([
        UsuarioUpdateManyMutationInputSchema,
        UsuarioUncheckedUpdateManyInputSchema,
      ]),
      where: UsuarioWhereInputSchema.optional(),
    })
    .strict();

export const UsuarioDeleteManyArgsSchema: z.ZodType<Prisma.UsuarioDeleteManyArgs> =
  z
    .object({
      where: UsuarioWhereInputSchema.optional(),
    })
    .strict();
